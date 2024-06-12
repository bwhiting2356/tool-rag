import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
};

export function parseMessage(message: { content: string; role: any; id: string }) {
    if (!message?.content) return null;
    if (message?.content.startsWith('{') && !message?.content.includes('}]}')) {
        return {
            ...message,
            content: ''
        }
    }
    const splitMessage = message?.content.split('}]}');
    if (splitMessage.length > 1 && message.role === 'assistant') {
        return {
            ...message,
            content: splitMessage[splitMessage.length - 1],
        };
    }
    return message;
}

export function extractToolNames(jsonString: string) {
    // Define the regular expression
    const regex = /"name"\s*:\s*"([^"]+)"/g;
    
    // Initialize an array to hold all tool names
    const toolNames = [];
    let match;

    // Reset lastIndex to 0
    regex.lastIndex = 0;

    // Use regex.exec() to find all matches
    while ((match = regex.exec(jsonString)) !== null) {
        toolNames.push(match[1]);
    }

    // Return the array of tool names
    return toolNames.length ? toolNames : null;
}
