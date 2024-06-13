import { useContext, useEffect, useMemo, useRef } from 'react';

import { Message, useChat } from 'ai/react';
import { Input } from '@/components/ui/input';
import MessageComponent from './MessageComponent';
import { StopCircle, ArrowCircleUp } from '@phosphor-icons/react';
import { ToolRagContext } from '../state/context';
import { extractToolNames, parseMessage } from '@/lib/utils';

export default function Chat() {
    const { setToolsUsed } = useContext(ToolRagContext);
    const { input, handleInputChange, error, messages, handleSubmit, isLoading } = useChat();
    console.log('messages', messages)
    const showThinking = useMemo(() => {
        return isLoading && messages[messages.length - 1]?.role === 'user';
    }, [isLoading, messages]);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const formattedMessages = useMemo(() => {
        return messages.map(parseMessage);
    }, [messages]);

    useEffect(() => {
        const toolsUsed = messages
            .map(m => m.content)
            .filter(c => c.includes('tool_calls'))
            // .map(val => val.split('}]}')[0])
            .map(extractToolNames).flat()
        console.log('tools used', toolsUsed)
        setToolsUsed(toolsUsed as any);

    }, [messages])
   

    useEffect(() => {
        if (!isLoading) {
            inputRef.current?.focus();
        }
    }, [isLoading]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messages]);

    return (
        <div
            className={`flex flex-col overflow-y-scroll items-center justify-between max-h-screen text-sm w-1/3 h-full border-r transition-width duration-300 relative`}
        >
            {
                <div className="flex flex-col w-full mx-auto flex-grow px-2">
                    <div className="my-4">
                        <h2 className="font-bold text-xl">Tool RAG</h2>
                    </div>
                    {error != null && (
                        <div className="relative px-6 py-4 text-white bg-red-500 rounded-md">
                            <span className="block sm:inline">
                                Error: {(error as any).toString()}
                            </span>
                        </div>
                    )}
                    {formattedMessages.map((m: any) => (
                        <MessageComponent key={m.id} message={m} />
                    ))}
                    {showThinking && <MessageComponent showThinking />}
                    <div ref={messagesEndRef} />
                </div>
            }
            <div className="w-full sticky bottom-0 p-2 border-t border-gray-300 bg-white">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        ref={inputRef}
                        disabled={isLoading}
                        className="flex-grow p-2 border border-gray-300 rounded-l shadow-xl"
                        value={input}
                        placeholder="What do you want to do today?"
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className={`p-2 rounded text-white bg-gray-700`}
                        onClick={isLoading ? stop : undefined}
                    >
                        {isLoading ? <StopCircle size={20} /> : <ArrowCircleUp size={20} />}
                    </button>
                </form>
            </div>
        </div>
    );
}
