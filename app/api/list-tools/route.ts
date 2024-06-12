import { tools } from '../tools';
import { getOnlyToolNamesAndDescriptions } from '../tools/upsert-tools';

export async function GET() {
    const toolNamesAndDescriptions = getOnlyToolNamesAndDescriptions(tools);
    return new Response(JSON.stringify(toolNamesAndDescriptions));
}
