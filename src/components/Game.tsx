import { useState } from "react";

import { useGeneration } from "@/contexts/generation/GenerationContext";

import { CodeMatrix } from "./CodeMatrix";

import { type Matrix, type MatrixDirection, type GameSequences } from "@/types";

import { MATRIX_DIRECTION } from "@/consts";

import { createGameSequence } from "@/utils";

export function Game() {
    const generation = useGeneration();

    const [matrix, setMatrix] = useState<Matrix>(() => generation.generateMatrix(5));
    const [sequences, setSequences] = useState<GameSequences>(() => {
        const sequences = generation.generateSequences(2, 3);
        return createGameSequence(sequences);
    });

    const [direction, setDirection] = useState<MatrixDirection>(MATRIX_DIRECTION.ROW);
    const [currentDirectionNumber, setCurrentDirectionNumber] = useState<number>(0);
    const [nextDirectionNumber, setNextDirectionNumber] = useState<number | null>(null);

    function handleRestart() {
        generation.reset(4);
        setMatrix(generation.generateMatrix(5));
        setSequences(createGameSequence(generation.generateSequences(2, 3)));
    }

    function handleSelectElement(value: string, sizedIndex: number) {
        setDirection((prevDirection) =>
            prevDirection === MATRIX_DIRECTION.ROW ? MATRIX_DIRECTION.COL : MATRIX_DIRECTION.ROW,
        );
        setCurrentDirectionNumber(sizedIndex);
        setNextDirectionNumber(null);
    }

    return (
        <div>
            <CodeMatrix
                matrix={matrix}
                direction={direction}
                currentDirectionNumber={currentDirectionNumber}
                nextDirectionNumber={nextDirectionNumber}
                onDirectionHover={(index) => setNextDirectionNumber(index)}
                onSelect={handleSelectElement}
            />

            <div>
                {sequences.map((sequence, index) => (
                    <p key={`sequence#${index}`} className="flex gap-2 uppercase">
                        {sequence.values.map((value, index) => (
                            <span key={`value#${index}`}>{value}</span>
                        ))}
                    </p>
                ))}
            </div>
        </div>
    );
}
