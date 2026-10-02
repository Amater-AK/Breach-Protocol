import { type Matrix, type MatrixDirection } from "@/types";

import { MATRIX_DIRECTION } from "@/consts";

import { getMatrixRowIndices, getMatrixColIndices } from "@/utils";

interface CodeMatrixProps {
    matrix: Matrix;
    direction: MatrixDirection;
    directionNumber: number;
}

export function CodeMatrix({ matrix, direction, directionNumber }: CodeMatrixProps) {
    const currentDirectionIndices =
        direction === MATRIX_DIRECTION.ROW
            ? getMatrixRowIndices(matrix, directionNumber)
            : getMatrixColIndices(matrix, directionNumber);
    const size = Math.sqrt(matrix.length);

    return (
        <div
            className="grid grid-cols-(--matrix-size) grid-rows-(--matrix-size) size-80"
            style={{ "--matrix-size": `repeat(${size}, minmax(0, 1fr))` } as React.CSSProperties}
        >
            {matrix.map((element, index) => {
                return (
                    <CodeMatrixGridElement
                        key={`element#${index}`}
                        inCurrentDirection={currentDirectionIndices.includes(index)}
                    >
                        {element}
                    </CodeMatrixGridElement>
                );
            })}
        </div>
    );
}

interface CodeMatrixGridElementProps {
    children: React.ReactNode;
    inCurrentDirection: boolean;
}

function CodeMatrixGridElement({ children, inCurrentDirection }: CodeMatrixGridElementProps) {
    return <div className={`p-2 uppercase ${inCurrentDirection ? "bg-amber-200" : ""}`}>{children}</div>;
}
