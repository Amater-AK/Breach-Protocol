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
    type GameSequences,
    type Buffer as TypeBuffer,
} from "@/types";

import { GAME_STATE, SEQUENCE_STATUS } from "@/consts";

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

    const [buffer, setBuffer] = useState<TypeBuffer>([]);

    function handleRestart() {
        generation.generate(config);

        setGameState(GAME_STATE.WAIT);
        setGameIterationKey((prevIteratinoKey) => prevIteratinoKey + 1);

        setMatrix(generation.getMatrix());
        setSequences(createGameSequence(generation.getSequences()));
        setBuffer([]);
    }

    function handleSelectElement(element: Element, index: number) {
        if (gameState === GAME_STATE.WAIT) {
            setGameState(GAME_STATE.PLAYING);
            // Включение таймера
        }
        if (gameState === GAME_STATE.RESULTS) {
            return;
        }

        // Обновление матрицы
        setMatrix((prevMatrix) => prevMatrix.map((element, i) => (i === index ? "" : element)));

        // Заполнение буфера
        setBuffer((prevBuffer) => [...prevBuffer, element]);
        if (buffer.length + 1 === config.bufferSize) {
            finalUpdateSequencesStatus();

            setGameState(GAME_STATE.RESULTS);
        }

        // Обновление состояний последовательностей
        setSequences((prevSequences) => {
            const nextSequences = prevSequences.map((sequence) => {
                const newIndex = sequence.values[sequence.index] === element ? sequence.index + 1 : sequence.index;
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
                key={`timer#${gameIterationKey}`}
                duration={5000}
                isRunning={gameState === GAME_STATE.PLAYING}
                onTimeOut={handleTimeOut}
            />

            <CodeMatrix
                key={`matrix#${gameIterationKey}`}
                matrix={matrix}
                isDisabled={gameState === GAME_STATE.RESULTS}
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
