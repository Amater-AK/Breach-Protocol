import { GAME_DIFFICULTY } from "@/consts";

export type GameDifficulty = (typeof GAME_DIFFICULTY)[keyof typeof GAME_DIFFICULTY];
