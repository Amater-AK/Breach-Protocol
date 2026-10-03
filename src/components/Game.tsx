import { useState } from "react";

import { useGeneration } from "@/contexts/generation/GenerationContext";

import { CodeMatrix } from "./CodeMatrix";
import { Buffer } from "./Buffer";

import {
    type GameState,
    type Element,
    type Matrix,
    type MatrixDirection,
    type GameSequences,
    type Buffer as TypeBuffer,
} from "@/types";

import { GAME_STATE, MATRIX_DIRECTION } from "@/consts";

import { createGameSequence } from "@/utils";

const DEFAULT_CONFIG = {
    ALPHABET_LENGTH: 4,
    MATRIX_SIZE: 5,
    BUFFER_SIZE: 5,
    SEQUENCE_QUANTITY: 2,
    SEQUENCE_LENGTH: 3,
} as const;

export function Game() {
    const generation = useGeneration();

    const [gameState, setGameState] = useState<GameState>(GAME_STATE.WAIT);

    const [matrix, setMatrix] = useState<Matrix>(() => generation.generateMatrix(DEFAULT_CONFIG.MATRIX_SIZE));
    const [sequences, setSequences] = useState<GameSequences>(() => {
        const sequences = generation.generateSequences(
            DEFAULT_CONFIG.SEQUENCE_QUANTITY,
            DEFAULT_CONFIG.SEQUENCE_LENGTH,
        );
        return createGameSequence(sequences);
    });

    const [direction, setDirection] = useState<MatrixDirection>(MATRIX_DIRECTION.ROW);
    const [currentDirectionNumber, setCurrentDirectionNumber] = useState<number>(0);
    const [nextDirectionNumber, setNextDirectionNumber] = useState<number | null>(null);

    const [buffer, setBuffer] = useState<TypeBuffer>([]);

    function handleRestart() {
        generation.reset(DEFAULT_CONFIG.ALPHABET_LENGTH);

        setGameState(GAME_STATE.WAIT);

        setMatrix(generation.generateMatrix(DEFAULT_CONFIG.MATRIX_SIZE));
        setSequences(
            createGameSequence(
                generation.generateSequences(DEFAULT_CONFIG.SEQUENCE_QUANTITY, DEFAULT_CONFIG.SEQUENCE_LENGTH),
            ),
        );

        setDirection(MATRIX_DIRECTION.ROW);
        setCurrentDirectionNumber(0);
        setNextDirectionNumber(null);
        setBuffer([]);
    }

    function handleSelectElement(value: Element, directionNumber: number) {
        if (gameState === GAME_STATE.WAIT) {
            setGameState(GAME_STATE.PLAYING);
            // Включение таймера
        }
        if (gameState === GAME_STATE.RESULTS) {
            return;
        }

        // Заполнение буфера
        setBuffer((prevBuffer) => [...prevBuffer, value]);
        if (buffer.length + 1 === DEFAULT_CONFIG.BUFFER_SIZE) {
            // Обновление статуса последовательностей
            // ...

            setGameState(GAME_STATE.RESULTS);
        }

        // Обновление состояний последовательностей
        // ...

        // Изменение направления (строка -> колонка -> строка -> ...)
        setDirection((prevDirection) =>
            prevDirection === MATRIX_DIRECTION.ROW ? MATRIX_DIRECTION.COL : MATRIX_DIRECTION.ROW,
        );
        setCurrentDirectionNumber(directionNumber);
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

            <Buffer buffer={buffer} size={DEFAULT_CONFIG.BUFFER_SIZE} />

            <div>
                {sequences.map((sequence, index) => (
                    <p key={`sequence#${index}`} className="flex gap-2 uppercase">
                        {sequence.values.map((value, index) => (
                            <span key={`value#${index}`}>{value}</span>
                        ))}
                    </p>
                ))}
            </div>

            {gameState === GAME_STATE.RESULTS && (
                <button className="p-1 bg-stone-400" onClick={handleRestart}>
                    Again
                </button>
            )}
        </div>
    );
}
