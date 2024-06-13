'use client';

import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Explanation from './components/Explanation';
import Chat from './components/Chat';
import { ToolRagProvider } from './state/context';


const queryClient = new QueryClient();

const siteId = process.env.NEXT_PUBLIC_HOTJAR_SITE_ID;
const hotjarVersion = 6;

export default function Home() {
    useEffect(() => {
        Hotjar.init(siteId as any, hotjarVersion);
    }, []);

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
