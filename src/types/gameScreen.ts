import { GAME_SCREEN } from "@/consts";

export type GameScreen = (typeof GAME_SCREEN)[keyof typeof GAME_SCREEN];
