import { useState, useCallback } from "react";

import { useGeneration } from "@/contexts/generation/GenerationContext";

import { CodeMatrix } from "./CodeMatrix";
import { Buffer } from "./Buffer";
import { Sequences } from "./Sequences";
import { Timer } from "./Timer";

import {
    type GameConfig,
    type GameState,
    type GameResult,
    type Element,
    type Matrix,
    type GameSequences,
    type Buffer as TypeBuffer,
} from "@/types";

import { GAME_STATE, SEQUENCE_STATUS, GAME_COMPLETION_OPTION, GAME_COMPLETION_DESCRIPTIONS } from "@/consts";

import { createGameSequence, isSomeGameSequencesCompleted, isAllGameSequencesCompleted } from "@/utils";

interface GameScreenProps {
    config: GameConfig;
    onBack: () => void;
}

export function GameScreen({ config, onBack }: GameScreenProps) {
    const generation = useGeneration();

    const [gameState, setGameState] = useState<GameState>(GAME_STATE.WAIT);
    const [gameResult, setGameResult] = useState<GameResult | null>(null);
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

        // Обновление состояний последовательностей
        const updatedSequences = sequences.map((sequence) => {
            const newIndex = sequence.values[sequence.index] === element ? sequence.index + 1 : sequence.index;
            const newStatus = newIndex === sequence.values.length ? SEQUENCE_STATUS.SUCCESS : sequence.status;

            return {
                ...sequence,
                index: newIndex,
                status: newStatus,
            };
        });
        setSequences(updatedSequences);

        checkGameCompletion(updatedSequences);

        // Все последовательности выполнены
        // if (updatedSequences.every((sequence) => sequence.status === SEQUENCE_STATUS.SUCCESS)) {
        //     setGameState(GAME_STATE.RESULTS);
        //     setGameResult({ type: "success", option: GAME_COMPLETION_OPTION.ALL_UPLOADED });

        //     return;
        // }

        // Буфер заполнен
        // if (buffer.length + 1 === config.bufferSize) {
        //     finalUpdateSequencesStatus();

        //     setGameState(GAME_STATE.RESULTS);
        //     setGameResult({
        //         type: isSomeGameSequencesCompleted(sequences) ? "success" : "fail",
        //         option: GAME_COMPLETION_OPTION.BUFFER_FULL,
        //     });
        // }
    }

    // Не выполненные последовательности помечаются, как проваленные
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

    const handleTimeOut = useCallback(() => {
        finalUpdateSequencesStatus();

        setGameState(GAME_STATE.RESULTS);
        setGameResult({
            type: isSomeGameSequencesCompleted(sequences) ? "success" : "fail",
            option: GAME_COMPLETION_OPTION.TIMED_OUT,
        });
    }, [sequences]);

    function checkGameCompletion(sequences: GameSequences) {
        // Все последовательности выполнены
        if (isAllGameSequencesCompleted(sequences)) {
            setGameState(GAME_STATE.RESULTS);
            setGameResult({ type: "success", option: GAME_COMPLETION_OPTION.ALL_UPLOADED });

            return;
        }

        // Буфер заполнен
        if (buffer.length + 1 === config.bufferSize) {
            finalUpdateSequencesStatus();

            setGameState(GAME_STATE.RESULTS);
            setGameResult({
                type: isSomeGameSequencesCompleted(sequences) ? "success" : "fail",
                option: GAME_COMPLETION_OPTION.BUFFER_FULL,
            });

            return;
        }
    }

    // Логика завершения игры
    // useEffect(() => {
    //     // Ограничиваем, так как finalUpdateSequencesStatus обновляет sequences
    //     if (gameState === GAME_STATE.RESULTS) return;

    //     // Все последовательности выполнены
    //     if (isAllGameSequencesCompleted(sequences)) {
    //         setGameState(GAME_STATE.RESULTS);
    //         setGameResult({ type: "success", option: GAME_COMPLETION_OPTION.ALL_UPLOADED });

    //         return;
    //     }

    //     // Буфер заполнен
    //     if (buffer.length === config.bufferSize) {
    //         finalUpdateSequencesStatus();

    //         setGameState(GAME_STATE.RESULTS);
    //         setGameResult({
    //             type: isSomeGameSequencesCompleted(sequences) ? "success" : "fail",
    //             option: GAME_COMPLETION_OPTION.BUFFER_FULL,
    //         });

    //         return;
    //     }

    //     // Время вышло
    //     if (timedOut) {
    //         finalUpdateSequencesStatus();

    //         setGameState(GAME_STATE.RESULTS);
    //         setGameResult({
    //             type: isSomeGameSequencesCompleted(sequences) ? "success" : "fail",
    //             option: GAME_COMPLETION_OPTION.TIMED_OUT,
    //         });
    //     }
    // }, [sequences, buffer, timedOut]);

    return (
        <div>
            <Timer
                key={`timer#${gameIterationKey}`}
                duration={10000}
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
                <div className="flex justify-between gap-4">
                    <p className="flex gap-4">
                        {gameResult && (
                            <>
                                <span>{GAME_COMPLETION_DESCRIPTIONS[gameResult.option]}</span>
                                <span>{gameResult.type}</span>
                            </>
                        )}
                    </p>

                    <button className="p-1 bg-stone-400" onClick={handleRestart}>
                        Again
                    </button>
                </div>
            )}
        </div>
    );
}
