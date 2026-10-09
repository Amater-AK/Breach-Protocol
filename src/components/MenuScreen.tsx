import { Button } from "./ui/Button";

import { type GameDifficulty } from "@/types";

import { GAME_DIFFICULTY } from "@/consts";

interface MenuScreenProps {
    onSelectDifficulty: (difficulty: GameDifficulty) => void;
}

export function MenuScreen({ onSelectDifficulty }: MenuScreenProps) {
    return (
        <section className="h-full flex flex-col justify-center items-center gap-32">
            <div>
                <h1 className="text-5xl font-bold uppercase">Breach Protocol</h1>
                <p className="text-xxs sm:text-right text-text-secondary">Based on the minigame from Cyberpunk 2077</p>
            </div>

            <menu className="grid gap-4">
                <Button styleType="primary" sizeType="big" onClick={() => onSelectDifficulty(GAME_DIFFICULTY.EASY)}>
                    Easy
                </Button>
                <Button styleType="primary" sizeType="big" onClick={() => onSelectDifficulty(GAME_DIFFICULTY.NORMAL)}>
                    Normal
                </Button>
                <Button styleType="primary" sizeType="big" onClick={() => onSelectDifficulty(GAME_DIFFICULTY.HARD)}>
                    Hard
                </Button>
            </menu>
        </section>
    );
}
