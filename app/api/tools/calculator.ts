async function calculate(args: any) {
    try {
        // Parse the JSON string to extract operands and operation
        const { operand1, operand2, operation } = JSON.parse(args);

        // Check for valid operation
        if (
            ![
                'add',
                'subtract',
                'multiply',
                'divide',
                'power',
                'sqrt',
                'sin',
                'cos',
                'tan',
                'log',
                'exp',
            ].includes(operation)
        ) {
            throw new Error(
                'Invalid operation. Supported operations: add, subtract, multiply, divide, power, sqrt, sin, cos, tan, log, exp.',
            );
        }

        let result;

        // Perform the calculation based on the operation
        switch (operation) {
            case 'add':
                result = operand1 + operand2;
                break;
            case 'subtract':
                result = operand1 - operand2;
                break;
            case 'multiply':
                result = operand1 * operand2;
                break;
            case 'divide':
                if (operand2 === 0) {
                    throw new Error('Division by zero is not allowed.');
                }
                result = operand1 / operand2;
                break;
            case 'power':
                result = Math.pow(operand1, operand2);
                break;
            case 'sqrt':
                if (operand1 < 0) {
                    throw new Error('Square root of negative number is not allowed.');
                }
                result = Math.sqrt(operand1);
                break;
            case 'sin':
                result = Math.sin(operand1);
                break;
            case 'cos':
                result = Math.cos(operand1);
                break;
            case 'tan':
                result = Math.tan(operand1);
                break;
            case 'log':
                if (operand1 <= 0) {
                    throw new Error('Logarithm of non-positive number is not allowed.');
                }
                result = Math.log(operand1);
                break;
            case 'exp':
                result = Math.exp(operand1);
                break;
            default:
                throw new Error('Unsupported operation.');
        }

        // Return the result
        return { result };
    } catch (error) {
        console.error('Error:', error);
        return { error };
    }
}

export const calculatorToolDefinition = {
    type: 'function' as any,
    function: {
        name: 'calculate',
        function: calculate,
        description:
            'Perform a variety of arithmetic and scientific calculations on given numbers and return the result.',
        parameters: {
            type: 'object',
            properties: {
                operand1: {
                    type: 'number',
                    description:
                        'The first number in the calculation. This parameter is required. For operations like sqrt, sin, cos, tan, log, and exp, only operand1 is needed.',
                },
                operand2: {
                    type: 'number',
                    description:
                        'The second number in the calculation. This is optional and used only for binary operations like add, subtract, multiply, divide, and power.',
                },
                operation: {
                    type: 'string',
                    enum: [
                        'add',
                        'subtract',
                        'multiply',
                        'divide',
                        'power',
                        'sqrt',
                        'sin',
                        'cos',
                        'tan',
                        'log',
                        'exp',
                    ],
                    description:
                        "The arithmetic or scientific operation to perform. Supported operations: 'add', 'subtract', 'multiply', 'divide', 'power', 'sqrt', 'sin', 'cos', 'tan', 'log', 'exp'.",
                },
            },
            required: ['operand1', 'operation'],
        },
    },
};
