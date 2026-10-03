import { type Buffer as TypeBuffer, type Element } from "@/types";

interface BufferProps {
    buffer: TypeBuffer;
    size: number;
}

export function Buffer({ buffer, size }: BufferProps) {
    return (
        <div className="flex gap-2 p-2 border border-stone-700">
            {Array(size)
                .fill(0)
                .map((_, index) => (
                    <BufferElement key={`element#${index}`} element={buffer[index] || ""} />
                ))}
        </div>
    );
}

interface BufferElementProps {
    element: Element;
}

function BufferElement({ element }: BufferElementProps) {
    return <div className="flex justify-center items-center size-10 border border-stone-200 uppercase">{element}</div>;
}
