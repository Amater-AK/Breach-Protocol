import { GAME_COMPLETION_OPTION } from "@/consts";

export type GameCompletionOption = (typeof GAME_COMPLETION_OPTION)[keyof typeof GAME_COMPLETION_OPTION];

export interface GameResult {
    type: "success" | "fail";
    option: GameCompletionOption;
}
