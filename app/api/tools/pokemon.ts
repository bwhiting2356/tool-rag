async function getPokemonInfo(args: string) {
    try {
        const { name } = JSON.parse(args);

        if (!name) {
            throw new Error('Pokémon name is required.');
        }

        // Normalize the Pokémon name to lowercase
        const pokemonName = name.toLowerCase();

        // Fetch Pokémon data from the PokéAPI
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching Pokémon data: ${response.statusText}`);
        }

        const data = await response.json();

        // Extract relevant information
        const info = {
            name: data.name,
            id: data.id,
            type: data.types.map((t: any) => t.type.name),
            abilities: data.abilities.map((a: any) => a.ability.name),
            stats: data.stats.map((s: any) => ({
                name: s.stat.name,
                value: s.base_stat,
            })),
            weight: data.weight,
            height: data.height,
            base_experience: data.base_experience,
            sprite: data.sprites.front_default,
        };

        return { info };
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

export const pokemonInfoToolDefinition = {
    type: 'function' as any,
    function: {
        name: 'get-pokemon-info',
        function: getPokemonInfo,
        description:
            'Fetch detailed information about a specified Pokémon, such as its type, stats, abilities, and evolutions.',
        parameters: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description:
                        'The name of the Pokémon to fetch information about, e.g., "Pikachu".',
                },
            },
            required: ['name'],
        },
    },
};
