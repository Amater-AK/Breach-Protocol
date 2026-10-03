import { useState } from "react";

import { useGeneration } from "@/contexts/generation/GenerationContext";

import { CodeMatrix } from "./CodeMatrix";
import { Buffer } from "./Buffer";

import { type Matrix, type MatrixDirection, type GameSequences, type Buffer as TypeBuffer } from "@/types";

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

    const [buffer, setBuffer] = useState<TypeBuffer>([]);

    function handleRestart() {
        generation.reset(4);
        setMatrix(generation.generateMatrix(5));
        setSequences(createGameSequence(generation.generateSequences(2, 3)));
    }

    function handleSelectElement(value: string, directionNumber: number) {
        // Изменение направления (строка -> колонка -> строка -> ...)
        setDirection((prevDirection) =>
            prevDirection === MATRIX_DIRECTION.ROW ? MATRIX_DIRECTION.COL : MATRIX_DIRECTION.ROW,
        );
        setCurrentDirectionNumber(directionNumber);
        setNextDirectionNumber(null);

        // Заполнение буфера
        setBuffer((prevBuffer) => [...prevBuffer, value]);
        if (buffer.length + 1 === 5) {
            console.log("Buffer full");
            // Смена состояния игры
        }
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

            <Buffer buffer={buffer} size={5} />

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
