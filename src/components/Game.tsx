import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useGeneration } from "@/contexts/generation/GenerationContext";

import { Header } from "./Header";
import { ScreenContainer } from "./ScreenContainer";
import { MenuScreen } from "./MenuScreen";
import { GameScreen } from "./GameScreen";

import { type GameScreen as TypeGameScreen, type GameDifficulty, type GameConfig } from "@/types";

import { GAME_SCREEN, GAME_CONFIGS, GAME_DIFFICULTY } from "@/consts";

export function Game() {
    const [gameScreen, setGameScreen] = useState<TypeGameScreen>(GAME_SCREEN.MENU);
    const [gameConfig, setGameConfig] = useState<GameConfig>(GAME_CONFIGS[GAME_DIFFICULTY.NORMAL]);

    const { showBoundary } = useErrorBoundary();
    const generation = useGeneration();

    function handleSelectDifficulty(difficulty: GameDifficulty) {
        const config = GAME_CONFIGS[difficulty];
        handleGenerate(config);

        setGameConfig(config);
        setGameScreen(GAME_SCREEN.GAME);
    }

    function handleBack() {
        setGameConfig(GAME_CONFIGS[GAME_DIFFICULTY.NORMAL]);
        setGameScreen(GAME_SCREEN.MENU);
    }

    function handleRestart() {
        handleGenerate(gameConfig);
    }

    function handleGenerate(config: GameConfig) {
        try {
            generation.generate(config);
        } catch (error) {
            showBoundary(error);
        }
    }

    return (
        <div className="wrapper-wide flex flex-col gap-4 h-svh px-2 py-4 md:py-8">
            <Header />

            <ScreenContainer>
                {gameScreen === GAME_SCREEN.MENU && <MenuScreen onSelectDifficulty={handleSelectDifficulty} />}
                {gameScreen === GAME_SCREEN.GAME && (
                    <GameScreen config={gameConfig} onBack={handleBack} onRestart={handleRestart} />
                )}
            </ScreenContainer>
        </div>
    );
}
