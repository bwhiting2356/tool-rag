async function getFullWikipediaPage(args: any) {
    try {
        const { title, language = 'en' } = JSON.parse(args);
        const url = new URL(`https://${language}.wikipedia.org/w/api.php`);
        url.searchParams.append('action', 'query');
        url.searchParams.append('prop', 'revisions');
        url.searchParams.append('rvprop', 'content');
        url.searchParams.append('rvslots', 'main');
        url.searchParams.append('titles', title);
        url.searchParams.append('format', 'json');
        url.searchParams.append('formatversion', '2');

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Error fetching page content: ${response.statusText}`);
        }

        const data = await response.json();
        if (
            data.query &&
            data.query.pages &&
            data.query.pages[0] &&
            data.query.pages[0].revisions
        ) {
            return { content: data.query.pages[0].revisions[0].slots.main.content };
        } else {
            throw new Error('No content found for the given title');
        }
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

export const getFullWikipediaPageToolDefinition = {
    type: 'function' as any,
    function: {
        name: 'wikipedia_get_full_page',
        function: getFullWikipediaPage,
        description: 'Retrieve the full content of a Wikipedia article based on its title',
        parameters: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    description:
                        'The title of the Wikipedia article, e.g., "Artificial Intelligence". This parameter is required to specify the article to retrieve.',
                },
                language: {
                    type: 'string',
                    description:
                        'The language of the Wikipedia site, e.g., "en" for English. This parameter is optional and defaults to "en".',
                    default: 'en',
                },
            },
            required: ['title'],
        },
    },
};
