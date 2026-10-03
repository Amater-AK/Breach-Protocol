import { type Element } from "./element";

import { SEQUENCE_STATUS } from "@/consts";

export type Sequence = Element[];
export type Sequences = Sequence[];

export type SequenceStatus = (typeof SEQUENCE_STATUS)[keyof typeof SEQUENCE_STATUS];

export interface GameSequence {
    values: Sequence;
    index: number;
    status: SequenceStatus;
}
export type GameSequences = GameSequence[];
