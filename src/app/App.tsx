import { GenerationProvider } from "@/contexts/generation/GenerationProvider";

import { Game } from "@/components/Game";

export function App() {
    return (
        <GenerationProvider>
            <Game />
        </GenerationProvider>
    );
}
