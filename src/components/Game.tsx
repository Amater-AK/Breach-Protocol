import { useState } from "react";

import { useGeneration } from "@/contexts/generation/GenerationContext";

import { CodeMatrix } from "./CodeMatrix";

import { type Matrix, type GameSequences } from "@/types";

import { createGameSequence } from "@/utils";

export function Game() {
    const generation = useGeneration();
    const [matrix, setMatrix] = useState<Matrix>(() => generation.generateMatrix(5));
    const [sequences, setSequences] = useState<GameSequences>(() => {
        const sequences = generation.generateSequences(2, 3);
        return createGameSequence(sequences);
    });

    function handleRestart() {
        generation.reset(4);
        setMatrix(generation.generateMatrix(5));
        setSequences(createGameSequence(generation.generateSequences(2, 3)));
    }

    return (
        <div>
            <CodeMatrix matrix={matrix} direction="col" directionNumber={2} />

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
