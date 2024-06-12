type LeetspeakArgs = {
    text: string;
    mode: 'encode' | 'decode';
};

type LeetspeakResult = {
    result?: string;
    error?: any;
};

function translateLeetspeak(args: string): LeetspeakResult {
    try {
        const { text, mode }: LeetspeakArgs = JSON.parse(args);

        if (!text || !mode) {
            throw new Error('Text and mode are required.');
        }

        const leetDict: { [key: string]: string } = {
            A: '4',
            B: '8',
            C: '<',
            D: 'D',
            E: '3',
            F: 'F',
            G: '6',
            H: '#',
            I: '1',
            J: 'J',
            K: 'K',
            L: '1',
            M: 'M',
            N: 'N',
            O: '0',
            P: 'P',
            Q: 'Q',
            R: 'R',
            S: '5',
            T: '7',
            U: 'U',
            V: 'V',
            W: 'W',
            X: 'X',
            Y: 'Y',
            Z: '2',
            ' ': ' ',
        };

        const textDict: { [key: string]: string } = Object.entries(leetDict).reduce(
            (obj, [key, value]) => {
                obj[value] = key;
                return obj;
            },
            {} as { [key: string]: string },
        );

        const result = text
            .split('')
            .map(char =>
                mode === 'encode' ? leetDict[char.toUpperCase()] || char : textDict[char] || char,
            )
            .join('');

        return { result };
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

export const leetspeakTranslatorToolDefinition = {
    type: 'function' as const,
    function: {
        name: 'translate-leetspeak',
        function: translateLeetspeak,
        description: 'Translate text to and from leetspeak.',
        parameters: {
            type: 'object' as const,
            properties: {
                text: {
                    type: 'string' as const,
                    description: 'The text to translate or the leetspeak to decode.',
                },
                mode: {
                    type: 'string' as const,
                    enum: ['encode', 'decode'],
                    description: 'The mode of translation: "encode" or "decode".',
                },
            },
            required: ['text', 'mode'],
        },
    },
};
