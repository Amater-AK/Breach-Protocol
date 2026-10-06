import { type GameDifficulty } from "@/types";

import { GAME_DIFFICULTY } from "@/consts";

interface MenuScreenProps {
    onSelectDifficulty: (difficulty: GameDifficulty) => void;
}

export function MenuScreen({ onSelectDifficulty }: MenuScreenProps) {
    return (
        <div className="flex flex-col gap-2">
            <button onClick={() => onSelectDifficulty(GAME_DIFFICULTY.EASY)}>Easy</button>
            <button onClick={() => onSelectDifficulty(GAME_DIFFICULTY.NORMAL)}>Normal</button>
            <button onClick={() => onSelectDifficulty(GAME_DIFFICULTY.HARD)}>Hard</button>
        </div>
    );
}
