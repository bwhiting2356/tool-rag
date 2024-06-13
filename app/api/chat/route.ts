

import OpenAI from 'openai';
import { getSimilarToolsFromContext } from '../tools';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const client = new OpenAI();

const systemPrompt = `
You are a helpful assistant whose job it is to showcase how an LLM can be given
a list of tools that has been filtered by a RAG process. The tools you will be provided have been
filtered by an upstream process that took the message thread and decided which tools are the most relevant.
Your job is to now answer the user's request using these tools. Keep in mind that they may be asking
for something that requires multiple tools. Carefully consider whether the tools should be run concurrently,
or if you should run one tool first and then run the output of the first tool into the next tool (this is a common mistake)
`

export async function POST(req: Request) {
    const { messages } = await req.json();
    const withSystemMessage = [{ role: 'system', content: systemPrompt }, ...messages];
    const topTools = await getSimilarToolsFromContext(withSystemMessage);
    const response = client.beta.chat.completions.runTools({
        
        model: 'gpt-4o',
        messages: withSystemMessage,
        tools: topTools as any,
        stream: true
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}

