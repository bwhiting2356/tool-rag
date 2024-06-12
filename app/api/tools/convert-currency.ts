async function convertCurrency(args: any) {
    try {
        const { amount, from, to } = JSON.parse(args);

        if (typeof amount !== 'number' || !from || !to) {
            throw new Error('Amount, from, and to are required and must be valid.');
        }

        const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching currency data: ${response.statusText}`);
        }

        const data = await response.json();
        const rate = data.rates[to];
        if (!rate) {
            throw new Error(`Invalid target currency: ${to}`);
        }

        const convertedAmount = amount * rate;
        return { convertedAmount };
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

export const currencyConverterToolDefinition = {
    type: 'function' as any,
    function: {
        name: 'convert-currency',
        function: convertCurrency,
        description: 'Convert an amount from one currency to another.',
        parameters: {
            type: 'object',
            properties: {
                amount: {
                    type: 'number',
                    description: 'The amount of currency to convert.',
                },
                from: {
                    type: 'string',
                    description: 'The source currency code, e.g., "USD".',
                },
                to: {
                    type: 'string',
                    description: 'The target currency code, e.g., "EUR".',
                },
            },
            required: ['amount', 'from', 'to'],
        },
    },
};
