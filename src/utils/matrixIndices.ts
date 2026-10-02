import { type Matrix } from "@/types";

export function getMatrixRowIndices(matrix: Matrix, directionNumber: number | null): number[] {
    const indices: number[] = [];

    if (directionNumber === null) return indices;

    const size = Math.sqrt(matrix.length);
    const startIndex = directionNumber * size;
    const endtIndex = startIndex + size;

    for (let i = startIndex; i < endtIndex; i++) {
        indices.push(i);
    }

    return indices;
}
export function getMatrixColIndices(matrix: Matrix, directionNumber: number | null): number[] {
    const indices: number[] = [];

    if (directionNumber === null) return indices;

    const size = Math.sqrt(matrix.length);

    for (let i = directionNumber; i < matrix.length; i += size) {
        indices.push(i);
    }

    return indices;
}
