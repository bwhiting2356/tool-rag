import { useQuery } from "@tanstack/react-query";

const fetchTools = async () => {
    const response = await fetch('/api/list-tools');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useTools = () => {
    const {
        data: tools = [],
        error,
        isLoading,
        isError,
    } = useQuery<{ name: string, description: string}[]>({
        queryKey: ['tools'],
        queryFn: fetchTools,
    });

    return { tools, error, isLoading, isError };
};