import { type Sequences, type GameSequence, type GameSequences } from "@/types";

import { SEQUENCE_STATE } from "@/consts";

export function createGameSequence(sequences: Sequences): GameSequences {
    return sequences.map((sequence) => {
        const gameSequence: GameSequence = { values: sequence, index: 0, state: SEQUENCE_STATE.CHECKING };
        return gameSequence;
    });
}
