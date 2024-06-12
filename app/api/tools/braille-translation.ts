type TranslationArgs = {
    text: string;
    mode: 'encode' | 'decode';
};

type TranslationResult = {
    result?: string;
    error?: any;
};

function translateBraille(args: string): TranslationResult {
    try {
        const { text, mode }: TranslationArgs = JSON.parse(args);

        if (!text || !mode) {
            throw new Error('Text and mode are required.');
        }

        // Braille dictionary
        const brailleDict: { [key: string]: string } = {
            A: '⠁',
            B: '⠃',
            C: '⠉',
            D: '⠙',
            E: '⠑',
            F: '⠋',
            G: '⠛',
            H: '⠓',
            I: '⠊',
            J: '⠚',
            K: '⠅',
            L: '⠇',
            M: '⠍',
            N: '⠝',
            O: '⠕',
            P: '⠏',
            Q: '⠟',
            R: '⠗',
            S: '⠎',
            T: '⠞',
            U: '⠥',
            V: '⠧',
            W: '⠺',
            X: '⠭',
            Y: '⠽',
            Z: '⠵',
            '1': '⠁',
            '2': '⠃',
            '3': '⠉',
            '4': '⠙',
            '5': '⠑',
            '6': '⠋',
            '7': '⠛',
            '8': '⠓',
            '9': '⠊',
            '0': '⠚',
            ',': '⠂',
            ';': '⠆',
            ':': '⠒',
            '.': '⠲',
            '!': '⠖',
            '(': '⠶',
            ')': '⠶',
            '?': '⠦',
            '-': '⠤',
            ' ': ' ', // space
        };

        // Reverse Braille dictionary
        const textDict: { [key: string]: string } = Object.entries(brailleDict).reduce(
            (obj, [key, value]) => {
                obj[value] = key;
                return obj;
            },
            {} as { [key: string]: string },
        );

        let result: string;

        if (mode === 'encode') {
            // Encode text to Braille
            result = text
                .toUpperCase()
                .split('')
                .map(char => brailleDict[char] || '')
                .join('');
        } else if (mode === 'decode') {
            // Decode Braille to text
            result = text
                .split('')
                .map(char => textDict[char] || '')
                .join('');
        } else {
            throw new Error('Invalid mode. Use "encode" or "decode".');
        }

        return { result };
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

export const brailleTranslatorToolDefinition = {
    type: 'function' as const,
    function: {
        name: 'translate-braille',
        function: translateBraille,
        description: 'Translate text to Braille or Braille to text.',
        parameters: {
            type: 'object' as const,
            properties: {
                text: {
                    type: 'string' as const,
                    description: 'The text to translate or the Braille to decode.',
                },
                mode: {
                    type: 'string' as const,
                    enum: ['encode', 'decode'],
                    description:
                        'The mode of translation: "encode" for text to Braille, "decode" for Braille to text.',
                },
            },
            required: ['text', 'mode'],
        },
    },
};
