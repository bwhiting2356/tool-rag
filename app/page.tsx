'use client';

import Explanation from './components/Explanation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Chat from './components/Chat';
import { ToolRagProvider } from './state/context';

const queryClient = new QueryClient();

export default function Home() {
    return (
        <main className="flex h-screen flex items-center justify-between">
            <QueryClientProvider client={queryClient}>
                <ToolRagProvider>
                    <Chat />
                    <Explanation />
                </ToolRagProvider>
            </QueryClientProvider>
        </main>
    );
}
