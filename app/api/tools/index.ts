import { ScoredPineconeRecord } from '@pinecone-database/pinecone';
import { getCurrentWeatherToolDefinition } from './get-current-weather';
import { wikipediaSearchToolDefinition } from './wikipedia-search';
import { getFullWikipediaPageToolDefinition } from './wikipedia-get-full-page';
import { calculatorToolDefinition } from './calculator';
import { currencyConverterToolDefinition } from './convert-currency';
import { pokemonInfoToolDefinition } from './pokemon';
import { morseCodeTranslatorToolDefinition } from './morse-code';
import { brailleTranslatorToolDefinition } from './braille-translation';
import { pigLatinTranslatorToolDefinition } from './pig-latin-translation';
import { randomFactToolDefinition } from './random-fact-generator';
import { getEmbedding, openai } from './openai';
import { TOP_K, index } from './pinecone';
import { ChatCompletionMessage, ChatCompletionTool } from 'openai/resources/index.mjs';
import { leetspeakTranslatorToolDefinition } from './leetspeak-translation';

export const tools = [
    getCurrentWeatherToolDefinition,
    wikipediaSearchToolDefinition,
    getFullWikipediaPageToolDefinition,
    calculatorToolDefinition,
    currencyConverterToolDefinition,
    pokemonInfoToolDefinition,
    morseCodeTranslatorToolDefinition,
    brailleTranslatorToolDefinition,
    pigLatinTranslatorToolDefinition,
    randomFactToolDefinition,
    leetspeakTranslatorToolDefinition
];

const TOOLS_PROMPT_TEMPLATE = `
You are a helper assistant that's helping another LLM accomplish a task. Your output will go into a RAG process that will fetch the best tools from a database to accomplish a task. 
Given the following message context, please provide a list of tools as a JSON string array (only name + description) that you would ideally like to exist to accomplish the task to be fed into the next step. 
Always return a list even if it's only one value. Always return a list even if it's only one value (for example: { tools: ['search the web'] }). Do not return an empty list.

`;

export const getSimilarTools = async (description: string): Promise<ScoredPineconeRecord[]> => {
    const embedding = await getEmbedding(description);
    return index
        .query({
            vector: embedding,
            topK: TOP_K,
            includeMetadata: true,
        })
        .then(response => response.matches);
};

export const queryToolsDefinition = {
    type: 'function' as const,
    function: {
        name: 'query-tools',
        description:
            'Queries a list of tools and returns their names and descriptions as a JSON string array.',
        parameters: {
            type: 'object' as const,
            properties: {
                tools: {
                    type: 'array' as const,
                    items: {
                        type: 'string' as const,
                        description: 'Name of the tool to be queried.',
                    },
                    description: 'The list of tools to query.',
                },
            },
            required: ['tools'],
        },
    },
};

export async function getSimilarToolsFromContext(
    messages: ChatCompletionMessage[],
): Promise<ChatCompletionTool[]> {
    const messagesWithSystemMessage = [
        { role: 'system' as any, content: TOOLS_PROMPT_TEMPLATE } as ChatCompletionMessage,
        ...messages,
    ];
    const completion = await openai.chat.completions.create({
        messages: messagesWithSystemMessage,
        model: 'gpt-4o',
        tools: [queryToolsDefinition],
        tool_choice: { type: 'function', function: { name: 'query-tools' } },
        response_format: { type: 'json_object' },
    });

    const recommendedTools = completion.choices[0]?.message?.tool_calls
        ? JSON.parse(completion.choices[0]?.message?.tool_calls[0]?.function.arguments).tools
        : [];

    const matchedTools = await Promise.all(
        recommendedTools.map((description: string) => getSimilarTools(description)),
    );
    const flattenedTools = matchedTools
        .flat()
        .map(tool => ({
            id: tool.id,
            ...tool,
            name: tool.metadata.toolName,
            similarity: tool.score,
        }))
        .sort((a, b) => b.similarity - a.similarity);

    const uniqueTools = Array.from(new Map(flattenedTools.map(tool => [tool.id, tool])).values());
    const uniqueToolNames = uniqueTools.map(tool => tool.name);

    return tools.filter(tool => uniqueToolNames.includes(tool.function.name));
}
