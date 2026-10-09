import { type GameResult } from "@/types";

import { GAME_COMPLETION_DESCRIPTIONS } from "@/consts";

interface GameResultProps {
    result: GameResult;
}

export function GameResult({ result }: GameResultProps) {
    if (result.type === "success") {
        return (
            <div className="border border-success">
                <h2 className="px-4 py-1 text-lg text-text-negative bg-surface-success uppercase">Output</h2>

                <div className="px-4 py-2 text-success bg-bg-success uppercase">
                    <p>//Root</p>
                    <p>//Access_Request</p>
                    <p>//Access_Request_Success</p>
                    <DottedElement first="//Collecting Packet_1" second="Complete" />
                    <DottedElement first="//Collecting Packet_2" second="Complete" />
                    <DottedElement first="//Collecting Packet_3" second="Complete" />
                    <DottedElement first="//Collecting Packet_4" second="Complete" />
                    <p>//Login</p>
                    <p>//Login_Success</p>
                    <p>//</p>
                    <p>//Upload_In_Progress</p>
                    <p>//Upload_Complete</p>
                </div>

                <output className="flex justify-center items-center py-6 text-text-negative bg-surface-success uppercase">
                    {GAME_COMPLETION_DESCRIPTIONS[result.option]}
                </output>
            </div>
        );
    }

    return (
        <div className="border border-fail">
            <h2 className="px-4 py-1 text-lg text-text-negative bg-surface-fail uppercase">Output</h2>

            <div className="px-4 py-2 text-fail bg-bg-fail uppercase">
                <p>//Root_Attempt_1</p>
                <p>//Root_Attempt_2</p>
                <p>//Root_Attempt_3</p>
                <p>//Root_Failed</p>
                <p>//Root_Reboot</p>
                <DottedElement first="//Accessing" second="Failed" />
                <DottedElement first="//Accessing" second="Failed" />
                <DottedElement first="//Accessing" second="Failed" />
                <DottedElement first="//Accessing" second="Failed" />
                <DottedElement first="//Accessing" second="Failed" />
            </div>

            <output className="flex justify-center items-center py-6 text-text-negative bg-surface-fail uppercase">
                {GAME_COMPLETION_DESCRIPTIONS[result.option]}
            </output>
        </div>
    );
}

interface DottedElementProps {
    first: string;
    second: string;
}

function DottedElement({ first, second }: DottedElementProps) {
    return (
        <p className="flex items-center">
            <span>{first}</span>
            <span className="grow h-[0.7em] border-b-2 border-dotted"></span>
            <span>{second}</span>
        </p>
    );
}
