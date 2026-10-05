import { GenerationProvider } from "@/contexts/generation/GenerationProvider";

import { Game } from "@/components/Game";

import { type GameConfig } from "@/types";

const defaultGameConfig: GameConfig = {
    alphabetLength: 4,
    matrixSize: 5,
    sequenceQuantity: 2,
    sequenceLength: 3,
    bufferSize: 5,
} as const;

export function App() {
    return (
        <GenerationProvider>
            <Game config={defaultGameConfig} />
        </GenerationProvider>
    );
}
