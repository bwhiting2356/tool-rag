import { useTools } from '@/lib/useTools';
import { createContext, useState } from 'react';

interface ToolRagStateType {
    tools: { name: string, description: string }[];
    toolsUsed: string[];
    setToolsUsed: (toolsUsed: string[]) => void;
}

const initialContextState: ToolRagStateType = {
    tools: [],
    toolsUsed: [],
    setToolsUsed: () => {},
};

export const ToolRagContext = createContext<ToolRagStateType>(initialContextState);

interface ToolRagProviderProps {
    children: React.ReactNode;
}

export const ToolRagProvider = ({ children }: ToolRagProviderProps) => {
    const { tools, isLoading, error } = useTools();
    const [toolsUsed, setToolsUsed] = useState<string[]>([]);

    return <ToolRagContext.Provider value={{ tools, toolsUsed, setToolsUsed }}>{children}</ToolRagContext.Provider>;
};
