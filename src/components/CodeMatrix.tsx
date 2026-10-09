import { useState } from "react";

import { type Element, type Matrix, type MatrixDirection } from "@/types";

import { CodeMatrixElement } from "./CodeMatrixElement";

import { MATRIX_DIRECTION } from "@/consts";

import { getMatrixRowIndices, getMatrixColIndices } from "@/utils";

interface CodeMatrixProps {
    matrix: Matrix;
    onSelect: (value: Element, index: number) => void;
}

export function CodeMatrix({ matrix, onSelect }: CodeMatrixProps) {
    const [direction, setDirection] = useState<MatrixDirection>(MATRIX_DIRECTION.ROW);
    const [currentDirectionNumber, setCurrentDirectionNumber] = useState<number>(0);
    const [nextDirectionNumber, setNextDirectionNumber] = useState<number | null>(null);

    const currentDirectionIndices =
        direction === MATRIX_DIRECTION.ROW
            ? getMatrixRowIndices(matrix, currentDirectionNumber)
            : getMatrixColIndices(matrix, currentDirectionNumber);
    const nextDirectionIndices =
        direction === MATRIX_DIRECTION.ROW
            ? getMatrixColIndices(matrix, nextDirectionNumber)
            : getMatrixRowIndices(matrix, nextDirectionNumber);
    const size = Math.sqrt(matrix.length);

    function handleSelect(element: Element, index: number, directionNumber: number) {
        if (element === "") return;

        // Изменение направления (строка -> колонка -> строка -> ...)
        setDirection((prevDirection) =>
            prevDirection === MATRIX_DIRECTION.ROW ? MATRIX_DIRECTION.COL : MATRIX_DIRECTION.ROW,
        );
        setCurrentDirectionNumber(directionNumber);
        setNextDirectionNumber(null);

        onSelect(element, index);
    }

    return (
        <div className="border border-border-primary">
            <h2 className="px-4 py-1 text-lg text-text-negative bg-surface-primary uppercase">Code matrix</h2>

            <div className="flex justify-center p-2">
                <div
                    className="grid grid-cols-(--matrix-size) grid-rows-(--matrix-size)"
                    style={{ "--matrix-size": `repeat(${size}, minmax(0, 1fr))` } as React.CSSProperties}
                >
                    {matrix.map((element, index) => {
                        const col = index % size;
                        const row = (index - col) / size;
                        const inCurrentDirection = currentDirectionIndices.includes(index);
                        const newDirectionNumber = direction === MATRIX_DIRECTION.ROW ? col : row;

                        return (
                            <CodeMatrixGridElement
                                key={`element#${index}`}
                                inCurrentDirection={inCurrentDirection}
                                inNextDirection={nextDirectionIndices.includes(index)}
                                onEnter={() => setNextDirectionNumber(newDirectionNumber)}
                                onLeave={() => setNextDirectionNumber(null)}
                            >
                                <CodeMatrixElement
                                    element={element}
                                    isEmpty={!element}
                                    isDisabled={!inCurrentDirection}
                                    onClick={() => handleSelect(element, index, newDirectionNumber)}
                                />
                            </CodeMatrixGridElement>
                        );
                    })}
                </div>
            </div>
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
            className={`aspect-square ${inCurrentDirection ? "bg-current-direction/10" : inNextDirection ? "bg-next-direction/10" : ""}`}
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
        >
            {children}
        </div>
    );
}
