interface ToolCardProps {
    name: string;
    description: string;
    used: boolean;
}

export const ToolCard = ({ name, description, used }: ToolCardProps) => {
    return (
        <div className={`border rounded-lg p-4 my-4 relative ${used ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <h3 className="font-semibold text-normal mb-1">{name}</h3>
            <p className="text-gray-700 text-sm">{description}</p>
            {used && <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Used</span>}
        </div>
    );
};
