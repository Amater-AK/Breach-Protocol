import { type GameSequence, type GameSequences } from "@/types";

import { SEQUENCE_STATUS } from "@/consts";

interface SequencesProps {
    sequences: GameSequences;
}

export function Sequences({ sequences }: SequencesProps) {
    return (
        <div>
            {sequences.map((sequence, index) => (
                <SequencesElement key={`element#${index}`} sequence={sequence} />
            ))}
        </div>
    );
}

interface SequencesElementProps {
    sequence: GameSequence;
}

export function SequencesElement({ sequence }: SequencesElementProps) {
    return (
        <div className="flex gap-2 uppercase">
            {sequence.values.map((value, i) => {
                return (
                    <span
                        key={`value#${i}`}
                        className={`p-1 ${i < sequence.index ? "text-green-500" : i === sequence.index ? "bg-stone-200" : ""}`}
                    >
                        {value}
                    </span>
                );
            })}

            {sequence.status !== SEQUENCE_STATUS.CHECKING && (
                <span className={`${sequence.status === SEQUENCE_STATUS.SUCCESS ? "text-green-500" : "text-red-500"}`}>
                    {sequence.status === SEQUENCE_STATUS.SUCCESS ? "Success" : "Fail"}
                </span>
            )}
        </div>
    );
}
