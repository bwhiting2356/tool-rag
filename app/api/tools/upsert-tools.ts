import { Pinecone } from '@pinecone-database/pinecone';

import dotenv from 'dotenv';
dotenv.config();

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || '' });

export type ToolMetadata = {
    toolName: string;
};

export const index = pc.index<ToolMetadata>('tools');

import { createHash } from 'crypto';

import { tools } from '.';
import { getEmbedding } from './openai';

async function upsertTools() {
    const upsertsArray: { id: string; values: number[]; metadata: ToolMetadata }[] = [];

    for (const toolName in tools) {
        const toolDefinition = tools[toolName].function;
        const textToEmbed = `
            Name: ${toolDefinition.name}
            Description: ${toolDefinition.description}
        `;

        const toolHash = createHash('sha256').update(textToEmbed).digest('hex');
        const embedding = await getEmbedding(textToEmbed);
        upsertsArray.push({
            id: toolHash,
            values: embedding,
            metadata: {
                toolName: toolDefinition.name,
            },
        });
    }
    index.upsert(upsertsArray);

    console.log('Upsert complete');
}

// Run the upsert function
upsertTools().catch(console.error);
