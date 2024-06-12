type TranslationArgs = {
    text: string;
    mode: 'encode' | 'decode';
};

type TranslationResult = {
    result?: string;
    error?: any;
};

// Helper functions
function encodePigLatin(word: string): string {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (vowels.includes(word[0].toLowerCase())) {
        return word + 'way';
    } else {
        const firstVowelIndex = word
            .split('')
            .findIndex(char => vowels.includes(char.toLowerCase()));
        if (firstVowelIndex === -1) {
            return word + 'ay'; // handle words without vowels
        }
        return word.slice(firstVowelIndex) + word.slice(0, firstVowelIndex) + 'ay';
    }
}

function decodePigLatin(word: string): string {
    if (word.endsWith('way')) {
        return word.slice(0, -3);
    } else if (word.endsWith('ay')) {
        const baseWord = word.slice(0, -2);
        const consonantCluster = baseWord.match(/[^aeiou]+$/);
        if (consonantCluster) {
            return consonantCluster[0] + baseWord.slice(0, -consonantCluster[0].length);
        }
        return baseWord;
    }
    return word;
}

// Main function
function translatePigLatin(args: string): TranslationResult {
    try {
        const { text, mode }: TranslationArgs = JSON.parse(args);

        if (!text || !mode) {
            throw new Error('Text and mode are required.');
        }

        const words = text.split(' ');
        const result = words
            .map(word => (mode === 'encode' ? encodePigLatin(word) : decodePigLatin(word)))
            .join(' ');

        return { result };
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

export const pigLatinTranslatorToolDefinition = {
    type: 'function' as const,
    function: {
        name: 'translate-pig-latin',
        function: translatePigLatin,
        description: 'Translate text to Pig Latin or Pig Latin to text.',
        parameters: {
            type: 'object' as const,
            properties: {
                text: {
                    type: 'string' as const,
                    description: 'The text to translate or the Pig Latin to decode.',
                },
                mode: {
                    type: 'string' as const,
                    enum: ['encode', 'decode'],
                    description:
                        'The mode of translation: "encode" for text to Pig Latin, "decode" for Pig Latin to text.',
                },
            },
            required: ['text', 'mode'],
        },
    },
};
