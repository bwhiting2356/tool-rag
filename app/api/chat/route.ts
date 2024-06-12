import OpenAI from 'openai';
import { getSimilarToolsFromContext } from '../tools';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const client = new OpenAI();

export async function POST(req: Request) {
    const { messages } = await req.json();
    const filteredTools = messages;
    const topTools = await getSimilarToolsFromContext(filteredTools);
    const response = client.beta.chat.completions.runTools({
        model: 'gpt-4o',
        messages: filteredTools,
        tools: topTools as any,
        stream: true
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
