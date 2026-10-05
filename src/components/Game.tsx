import { useState } from "react";

import { useGeneration } from "@/contexts/generation/GenerationContext";

import { CodeMatrix } from "./CodeMatrix";
import { Buffer } from "./Buffer";
import { Sequences } from "./Sequences";
import { Timer } from "./Timer";

import {
    type GameConfig,
    type GameState,
    type Element,
    type Matrix,
    type MatrixDirection,
    type GameSequences,
    type Buffer as TypeBuffer,
} from "@/types";

import { GAME_STATE, MATRIX_DIRECTION, SEQUENCE_STATUS } from "@/consts";

import { createGameSequence } from "@/utils";

interface GameProps {
    config: GameConfig;
}

export function Game({ config }: GameProps) {
    const generation = useGeneration();

    const [gameState, setGameState] = useState<GameState>(GAME_STATE.WAIT);
    const [gameIterationKey, setGameIterationKey] = useState(() => {
        generation.generate(config); // ! Временно
        return 0;
    });

    const [matrix, setMatrix] = useState<Matrix>(() => generation.getMatrix());
    const [sequences, setSequences] = useState<GameSequences>(() => {
        const sequences = generation.getSequences();
        return createGameSequence(sequences);
    });

    const [direction, setDirection] = useState<MatrixDirection>(MATRIX_DIRECTION.ROW);
    const [currentDirectionNumber, setCurrentDirectionNumber] = useState<number>(0);
    const [nextDirectionNumber, setNextDirectionNumber] = useState<number | null>(null);

    const [buffer, setBuffer] = useState<TypeBuffer>([]);

    function handleRestart() {
        generation.generate(config);

        setGameState(GAME_STATE.WAIT);
        setGameIterationKey((prevIteratinoKey) => prevIteratinoKey + 1);

        setMatrix(generation.getMatrix());
        setSequences(createGameSequence(generation.getSequences()));

        setDirection(MATRIX_DIRECTION.ROW);
        setCurrentDirectionNumber(0);
        setNextDirectionNumber(null);
        setBuffer([]);
    }

    function handleSelectElement(value: Element, index: number, directionNumber: number) {
        if (gameState === GAME_STATE.WAIT) {
            setGameState(GAME_STATE.PLAYING);
            // Включение таймера
        }
        if (gameState === GAME_STATE.RESULTS) {
            return;
        }

        if (value === "") return;

        // Обновление матрицы
        setMatrix((prevMatrix) => prevMatrix.map((element, i) => (i === index ? "" : element)));

        // Заполнение буфера
        setBuffer((prevBuffer) => [...prevBuffer, value]);
        if (buffer.length + 1 === config.bufferSize) {
            finalUpdateSequencesStatus();

            setGameState(GAME_STATE.RESULTS);
        }

        // Обновление состояний последовательностей
        setSequences((prevSequences) => {
            const nextSequences = prevSequences.map((sequence) => {
                const newIndex = sequence.values[sequence.index] === value ? sequence.index + 1 : sequence.index;
                const newStatus = newIndex === sequence.values.length ? SEQUENCE_STATUS.SUCCESS : sequence.status;

                return {
                    ...sequence,
                    index: newIndex,
                    status: newStatus,
                };
            });

            // Все последовательности выполнены
            if (nextSequences.every((sequence) => sequence.status === SEQUENCE_STATUS.SUCCESS)) {
                setGameState(GAME_STATE.RESULTS);
            }

            return nextSequences;
        });

        // Изменение направления (строка -> колонка -> строка -> ...)
        setDirection((prevDirection) =>
            prevDirection === MATRIX_DIRECTION.ROW ? MATRIX_DIRECTION.COL : MATRIX_DIRECTION.ROW,
        );
        setCurrentDirectionNumber(directionNumber);
        setNextDirectionNumber(null);
    }

    function finalUpdateSequencesStatus() {
        setSequences((prevSequences) =>
            prevSequences.map((sequence) => {
                const newStatus = sequence.index < sequence.values.length ? SEQUENCE_STATUS.FAIL : sequence.status;

                return {
                    ...sequence,
                    status: newStatus,
                };
            }),
        );
    }

    function handleTimeOut() {
        finalUpdateSequencesStatus();

        setGameState(GAME_STATE.RESULTS);
    }

    return (
        <div>
            <Timer
                key={gameIterationKey}
                duration={100000}
                isRunning={gameState === GAME_STATE.PLAYING}
                onTimeOut={handleTimeOut}
            />

            <CodeMatrix
                matrix={matrix}
                direction={direction}
                currentDirectionNumber={currentDirectionNumber}
                nextDirectionNumber={nextDirectionNumber}
                onDirectionHover={(index) => setNextDirectionNumber(index)}
                onSelect={handleSelectElement}
            />

            <Buffer buffer={buffer} size={config.bufferSize} />

            <Sequences sequences={sequences} />

            {gameState === GAME_STATE.RESULTS && (
                <button className="p-1 bg-stone-400" onClick={handleRestart}>
                    Again
                </button>
            )}
        </div>
    );
}
