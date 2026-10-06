import { type GameDifficulty, type GameConfig } from "@/types";

export const GAME_CONFIGS: Record<GameDifficulty, GameConfig> = {
    easy: { alphabetLength: 3, matrixSize: 3, sequenceQuantity: 2, sequenceLength: 2, bufferSize: 3 },
    normal: { alphabetLength: 4, matrixSize: 5, sequenceQuantity: 3, sequenceLength: 3, bufferSize: 4 },
    hard: { alphabetLength: 5, matrixSize: 7, sequenceQuantity: 3, sequenceLength: 4, bufferSize: 5 },
} as const;
