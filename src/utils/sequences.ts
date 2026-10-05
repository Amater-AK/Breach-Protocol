import { type Sequences, type GameSequence, type GameSequences } from "@/types";

import { SEQUENCE_STATUS } from "@/consts";

export function createGameSequence(sequences: Sequences): GameSequences {
    return sequences.map((sequence) => {
        const gameSequence: GameSequence = { values: sequence, index: 0, status: SEQUENCE_STATUS.CHECKING };
        return gameSequence;
    });
}

export function isSomeGameSequencesCompleted(sequences: GameSequences) {
    return sequences.some((sequence) => sequence.status === SEQUENCE_STATUS.SUCCESS);
}

export function isAllGameSequencesCompleted(sequences: GameSequences) {
    return sequences.every((sequence) => sequence.status === SEQUENCE_STATUS.SUCCESS);
}
