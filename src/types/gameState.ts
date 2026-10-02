import { GAME_STATE } from "@/consts";

export type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE];
