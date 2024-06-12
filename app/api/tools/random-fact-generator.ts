// Define a hardcoded list of random facts
const randomFacts = [
    'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible.',
    "A single strand of spaghetti is called a 'spaghetto'.",
    'There are more stars in the universe than grains of sand on all the beaches on Earth.',
    "Bananas are berries, but strawberries aren't.",
    'Wombat poop is cube-shaped.',
    'Octopuses have three hearts.',
    'The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.',
    "You can't hum while holding your nose closed.",
];

// Function to get a random fact
async function getRandomFact(args: string) {
    try {
        // Parse arguments
        const { index } = JSON.parse(args);

        // Validate index
        if (typeof index !== 'number' || index < 0 || index >= randomFacts.length) {
            throw new Error('Index out of range. Please provide a valid index.');
        }

        // Get the fact
        const fact = randomFacts[index];

        // Return the fact
        return { fact };
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

// Tool definition for the random fact generator
export const randomFactToolDefinition = {
    type: 'function' as any,
    function: {
        name: 'get-random-fact',
        function: getRandomFact,
        description:
            'Fetch a random fact from a predefined list. Provide an index to get a specific fact.',
        parameters: {
            type: 'object',
            properties: {
                index: {
                    type: 'integer',
                    description:
                        'The index of the fact to fetch. Must be a valid index within the range of the facts list.',
                },
            },
            required: ['index'],
        },
    },
};
