import { SEQUENCE_STATE } from "@/consts";

export type Sequence = string[];
export type Sequences = Sequence[];

export type SequenceState = (typeof SEQUENCE_STATE)[keyof typeof SEQUENCE_STATE];

export interface GameSequence {
    sequence: Sequence;
    index: number;
    state: SequenceState;
}
