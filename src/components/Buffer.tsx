import { type Buffer as TypeBuffer, type Element } from "@/types";

interface BufferProps {
    buffer: TypeBuffer;
    size: number;
}

export function Buffer({ buffer, size }: BufferProps) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex gap-2 max-w-fit px-4 py-2 bg-bg-primary border border-border-primary">
                {Array(size)
                    .fill(0)
                    .map((_, index) => (
                        <BufferElement
                            key={`element#${index}`}
                            element={buffer[index] || ""}
                            isEmpty={!buffer[index]}
                        />
                    ))}
            </div>
            <h2 className="hidden md:block text-xl uppercase">Buffer</h2>
        </div>
    );
}

interface BufferElementProps {
    element: Element;
    isEmpty: boolean;
}

function BufferElement({ element, isEmpty }: BufferElementProps) {
    return (
        <div
            className={`flex justify-center items-center size-8 border ${isEmpty ? "border-dashed" : ""} border-border-primary uppercase`}
        >
            {element}
        </div>
    );
}
