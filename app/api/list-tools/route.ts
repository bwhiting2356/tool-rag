import { tools } from '../tools';

const getOnlyToolNamesAndDescriptions = (tools: any) => {
    const toolNamesAndDescriptions = [];
    for (const toolName in tools) {
        const toolDefinition = tools[toolName].function;
        toolNamesAndDescriptions.push({
            name: toolDefinition.name,
            description: toolDefinition.description,
        });
    }
    return toolNamesAndDescriptions;
};

export async function GET() {
    const toolNamesAndDescriptions = getOnlyToolNamesAndDescriptions(tools);
    return new Response(JSON.stringify(toolNamesAndDescriptions));
}
