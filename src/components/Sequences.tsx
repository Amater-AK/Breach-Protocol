import { type GameSequence, type GameSequences } from "@/types";

import { SEQUENCE_STATUS } from "@/consts";

interface SequencesProps {
    sequences: GameSequences;
}

export function Sequences({ sequences }: SequencesProps) {
    return (
        <div className="border border-border-secondary">
            <h2 className="px-4 py-1 text-lg border-b border-border-secondary uppercase">
                Sequence required to upload deamon
            </h2>
            <div className="p-2">
                {sequences.map((sequence, index) => (
                    <SequenceElement key={`element#${index}`} sequence={sequence} />
                ))}
            </div>
        </div>
    );
}

interface SequenceElementProps {
    sequence: GameSequence;
}

export function SequenceElement({ sequence }: SequenceElementProps) {
    return (
        <div>
            {sequence.status === SEQUENCE_STATUS.CHECKING && (
                <div className="flex gap-2 uppercase">
                    {sequence.values.map((value, i) => {
                        const isMatched = i < sequence.index;
                        const isCurrent = i === sequence.index;

                        return (
                            <span
                                key={`value#${i}`}
                                className={`aspect-square p-2 ${isMatched ? "text-text-primary" : isCurrent ? "text-text-secondary bg-current-direction/10" : "text-text-secondary"}`}
                            >
                                {value}
                            </span>
                        );
                    })}
                </div>
            )}

            {sequence.status !== SEQUENCE_STATUS.CHECKING && (
                <p
                    className={`p-2 text-text-negative ${sequence.status === SEQUENCE_STATUS.SUCCESS ? "bg-surface-success" : "bg-surface-fail"} uppercase`}
                >
                    {sequence.status === SEQUENCE_STATUS.SUCCESS ? "Installed" : "Failed"}
                </p>
            )}
        </div>
    );
}
