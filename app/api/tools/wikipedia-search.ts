// Define the new execute function
async function searchWikipedia(args: any) {
    try {
        const { query, language = 'en', limit = 10 } = JSON.parse(args);

        const url = new URL(`https://${language}.wikipedia.org/w/api.php`);
        url.searchParams.append('action', 'query');
        url.searchParams.append('list', 'search');
        url.searchParams.append('srsearch', query);
        url.searchParams.append('format', 'json');
        url.searchParams.append('srlimit', String(limit));

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Error searching Wikipedia: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.query && data.query.search) {
            return { results: data.query.search };
        } else {
            throw new Error('No search results found for the given query');
        }
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

export const wikipediaSearchToolDefinition = {
    type: 'function' as any,
    function: {
        name: 'wikipedia-search',
        function: searchWikipedia,
        description: 'Search for Wikipedia articles based on a query.',
        parameters: {
            type: 'object',
            properties: {
                query: {
                    type: 'string',
                    description: 'The search query for Wikipedia articles.',
                },
                language: {
                    type: 'string',
                    description:
                        'The language code for Wikipedia, e.g., "en" for English. Defaults to "en".',
                    default: 'en',
                },
                limit: {
                    type: 'integer',
                    description:
                        'The number of search results to return. Must be between 1 and 50. Defaults to 10.',
                    default: 10,
                    minimum: 1,
                    maximum: 50,
                },
            },
            required: ['query'],
        },
    },
};
