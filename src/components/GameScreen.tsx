import { useState, useCallback } from "react";

import { useGeneration } from "@/contexts/generation/GenerationContext";

import { CodeMatrix } from "./CodeMatrix";
import { Buffer } from "./Buffer";
import { Sequences } from "./Sequences";
import { Timer } from "./Timer";
import { Button } from "./ui/Button";
import { GameResult } from "./GameResult";

import {
    type GameConfig,
    type GameState,
    type GameResult as TypeGameResult,
    type Element,
    type Matrix,
    type GameSequences,
    type Buffer as TypeBuffer,
} from "@/types";

import { GAME_STATE, SEQUENCE_STATUS, GAME_COMPLETION_OPTION } from "@/consts";

import { createGameSequence, isSomeGameSequencesCompleted, isAllGameSequencesCompleted } from "@/utils";

interface GameScreenProps {
    config: GameConfig;
    onBack: () => void;
    onRestart: () => void;
}

export function GameScreen({ config, onBack, onRestart }: GameScreenProps) {
    const generation = useGeneration();

    const [gameState, setGameState] = useState<GameState>(GAME_STATE.WAIT);
    const [gameResult, setGameResult] = useState<TypeGameResult | null>(null);
    const [gameIterationKey, setGameIterationKey] = useState(0);

    const [matrix, setMatrix] = useState<Matrix>(() => generation.getMatrix());
    const [sequences, setSequences] = useState<GameSequences>(() => {
        const sequences = generation.getSequences();
        return createGameSequence(sequences);
    });

    const [buffer, setBuffer] = useState<TypeBuffer>([]);

    function handleRestart() {
        //generation.generate(config);
        onRestart();

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
            const isSome = isSomeGameSequencesCompleted(sequences);
            setGameResult({
                type: isSome ? "success" : "fail",
                option: isSome ? GAME_COMPLETION_OPTION.UPLOADED : GAME_COMPLETION_OPTION.BUFFER_FULL,
            });

            return;
        }
    }

    return (
        <section className="h-full flex flex-col gap-4">
            <div className="grid md:grid-cols-2 gap-2 md:gap-4 lg:gap-10 -mx-5.5 md:-mx-3.5 px-3.5 py-2 bg-surface-primary/20 border-y border-border-secondary">
                <Timer
                    key={`timer#${gameIterationKey}`}
                    duration={config.timeLimit}
                    isRunning={gameState === GAME_STATE.PLAYING}
                    onTimeOut={handleTimeOut}
                />

                <Buffer buffer={buffer} size={config.bufferSize} />
            </div>

            <div className="grid md:grid-cols-2 items-start gap-2 md:gap-4 lg:gap-10">
                <div className="flex flex-col gap-2">
                    {gameState !== GAME_STATE.RESULTS && (
                        <CodeMatrix key={`matrix#${gameIterationKey}`} matrix={matrix} onSelect={handleSelectElement} />
                    )}
                    {gameState === GAME_STATE.RESULTS && <GameResult result={gameResult!} />}

                    <div className="flex justify-between gap-4">
                        <Button styleType="primary" onClick={onBack}>
                            Back
                        </Button>

                        {gameState === GAME_STATE.RESULTS && (
                            <Button
                                styleType={gameResult!.type === "success" ? "success" : "fail"}
                                onClick={handleRestart}
                            >
                                Reboot
                            </Button>
                        )}
                    </div>
                </div>

                <Sequences sequences={sequences} />
            </div>
        </section>
    );
}
