import React, { useContext } from 'react';
import { ToolRagContext } from '../state/context';
import { ToolCard } from './ToolCard';

export default function Explanation() {
    const { tools, toolsUsed } = useContext(ToolRagContext);
    const toolsWithUsage = tools.map(tool => {
        return {
            ...tool,
            used: toolsUsed.includes(tool.name),
        };
    })

    return (
        <div
            className={`flex flex-col h-screen overflow-scroll px-4 justify-start transition-width duration-300 w-2/3`}
        >
            <div>
                <div className="my-4">
                    <h2 className="font-bold text-xl">How it Works</h2>
                </div>
                    <div className="text-normal text-gray-700 mr-12">
                        <p>
                            All the tools listed below are stored in a vector database. Only the top tools related to your query will be made available to the LLM using a similarity search. This is a toy example, but at a large organization this list may be several hundred tools for databases, APIs and processes that could be run.
                        </p>
                    </div>
                <div className="grid grid-cols-4 gap-4">
                    {toolsWithUsage.map((tool: any) => (
                        <ToolCard key={tool.name} {...tool}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
