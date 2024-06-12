type TranslationArgs = {
    text: string;
    mode: 'encode' | 'decode';
};

type TranslationResult = {
    result?: string;
    error?: any;
};

function translateMorseCode(args: string): TranslationResult {
    try {
        const { text, mode }: TranslationArgs = JSON.parse(args);

        if (!text || !mode) {
            throw new Error('Text and mode are required.');
        }

        // Morse code dictionary
        const morseCodeDict: { [key: string]: string } = {
            A: '.-',
            B: '-...',
            C: '-.-.',
            D: '-..',
            E: '.',
            F: '..-.',
            G: '--.',
            H: '....',
            I: '..',
            J: '.---',
            K: '-.-',
            L: '.-..',
            M: '--',
            N: '-.',
            O: '---',
            P: '.--.',
            Q: '--.-',
            R: '.-.',
            S: '...',
            T: '-',
            U: '..-',
            V: '...-',
            W: '.--',
            X: '-..-',
            Y: '-.--',
            Z: '--..',
            '1': '.----',
            '2': '..---',
            '3': '...--',
            '4': '....-',
            '5': '.....',
            '6': '-....',
            '7': '--...',
            '8': '---..',
            '9': '----.',
            '0': '-----',
            ', ': '--..--',
            '.': '.-.-.-',
            '?': '..--..',
            '/': '-..-.',
            '-': '-....-',
            '(': '-.--.',
            ')': '-.--.-',
            ' ': '/',
        };

        // Reverse Morse code dictionary
        const textDict: { [key: string]: string } = Object.entries(morseCodeDict).reduce(
            (obj, [key, value]) => {
                obj[value] = key;
                return obj;
            },
            {} as { [key: string]: string },
        );

        let result: string;

        if (mode === 'encode') {
            // Encode text to Morse code
            result = text
                .toUpperCase()
                .split('')
                .map(char => morseCodeDict[char] || '')
                .join(' ');
        } else if (mode === 'decode') {
            // Decode Morse code to text
            result = text
                .split(' ')
                .map(code => textDict[code] || '')
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

export const morseCodeTranslatorToolDefinition = {
    type: 'function' as const,
    function: {
        name: 'translate-morse-code',
        function: translateMorseCode,
        description: 'Translate text to Morse code or Morse code to text.',
        parameters: {
            type: 'object' as const,
            properties: {
                text: {
                    type: 'string' as const,
                    description: 'The text to translate or the Morse code to decode.',
                },
                mode: {
                    type: 'string' as const,
                    enum: ['encode', 'decode'],
                    description:
                        'The mode of translation: "encode" for text to Morse code, "decode" for Morse code to text.',
                },
            },
            required: ['text', 'mode'],
        },
    },
};
