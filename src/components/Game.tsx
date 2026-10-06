import { useState } from "react";

import { Header } from "./Header";
import { MenuScreen } from "./MenuScreen";
import { GameScreen } from "./GameScreen";

import { type GameScreen as TypeGameScreen, type GameDifficulty, type GameConfig } from "@/types";

import { GAME_SCREEN, GAME_CONFIGS, GAME_DIFFICULTY } from "@/consts";

export function Game() {
    const [gameScreen, setGameScreen] = useState<TypeGameScreen>(GAME_SCREEN.MENU);
    const [gameConfig, setGameConfig] = useState<GameConfig>(GAME_CONFIGS[GAME_DIFFICULTY.NORMAL]);

    function handleSelectDifficulty(difficulty: GameDifficulty) {
        setGameConfig(GAME_CONFIGS[difficulty]);
        setGameScreen(GAME_SCREEN.GAME);
    }

    function handleBack() {
        setGameConfig(GAME_CONFIGS[GAME_DIFFICULTY.NORMAL]);
        setGameScreen(GAME_SCREEN.MENU);
    }

    return (
        <div className="wrapper-wide h-svh px-2 py-8">
            <Header />

            {gameScreen === GAME_SCREEN.MENU && <MenuScreen onSelectDifficulty={handleSelectDifficulty} />}
            {gameScreen === GAME_SCREEN.GAME && <GameScreen config={gameConfig} onBack={handleBack} />}
        </div>
    );
}
