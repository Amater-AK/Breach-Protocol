import { type Matrix, type MatrixDirection } from "@/types";

import { CodeMatrixElement } from "./CodeMatrixElement";

import { MATRIX_DIRECTION } from "@/consts";

import { getMatrixRowIndices, getMatrixColIndices } from "@/utils";

interface CodeMatrixProps {
    matrix: Matrix;
    direction: MatrixDirection;
    currentDirectionNumber: number;
    nextDirectionNumber: number | null;
    onDirectionHover: (index: number | null) => void;
    onSelect: (value: string, sizedIndex: number) => void;
}

export function CodeMatrix({
    matrix,
    direction,
    currentDirectionNumber,
    nextDirectionNumber,
    onDirectionHover,
    onSelect,
}: CodeMatrixProps) {
    const currentDirectionIndices =
        direction === MATRIX_DIRECTION.ROW
            ? getMatrixRowIndices(matrix, currentDirectionNumber)
            : getMatrixColIndices(matrix, currentDirectionNumber);
    const nextDirectionIndices =
        direction === MATRIX_DIRECTION.ROW
            ? getMatrixColIndices(matrix, nextDirectionNumber)
            : getMatrixRowIndices(matrix, nextDirectionNumber);
    const size = Math.sqrt(matrix.length);

    return (
        // Сделать компонент сетки в css, который получает переменную и устанавливает grid
        <div
            className="grid grid-cols-(--matrix-size) grid-rows-(--matrix-size) size-80"
            style={{ "--matrix-size": `repeat(${size}, minmax(0, 1fr))` } as React.CSSProperties}
        >
            {matrix.map((element, index) => {
                const col = index % size;
                const row = (index - col) / size;
                const inCurrentDirection = currentDirectionIndices.includes(index);
                const newIndex = direction === MATRIX_DIRECTION.ROW ? col : row;

                return (
                    <CodeMatrixGridElement
                        key={`element#${index}`}
                        inCurrentDirection={inCurrentDirection}
                        inNextDirection={nextDirectionIndices.includes(index)}
                        onEnter={() => onDirectionHover(newIndex)}
                        onLeave={() => onDirectionHover(null)}
                    >
                        <CodeMatrixElement
                            element={element}
                            isDisabled={!inCurrentDirection}
                            onClick={() => onSelect(element, newIndex)}
                        />
                    </CodeMatrixGridElement>
                );
            })}
        </div>
    );
}

interface CodeMatrixGridElementProps {
    children: React.ReactNode;
    inCurrentDirection: boolean;
    inNextDirection: boolean;
    onEnter: () => void;
    onLeave: () => void;
}

function CodeMatrixGridElement({
    children,
    inCurrentDirection,
    inNextDirection,
    onEnter,
    onLeave,
}: CodeMatrixGridElementProps) {
    return (
        <div
            className={`p-2 ${inCurrentDirection ? "bg-amber-200" : inNextDirection ? "bg-stone-200" : ""}`}
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
        >
            {children}
        </div>
    );
}
