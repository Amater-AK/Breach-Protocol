import { type GameCompletionOption } from "@/types/gameCompletionOption";

export const GAME_COMPLETION_DESCRIPTIONS: Record<GameCompletionOption, string> = {
    allUploaded: "All deamons uploaded",
    uploaded: "Deamons uploaded",
    bufferFull: "Buffer full",
    timedOut: "Timed out",
} as const;
