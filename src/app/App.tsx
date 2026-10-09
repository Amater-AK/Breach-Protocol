import { ErrorBoundary } from "react-error-boundary";

import { GenerationProvider } from "@/contexts/generation/GenerationProvider";

import { Error } from "@/components/Error";

import { Game } from "@/components/Game";

export function App() {
    return (
        <ErrorBoundary FallbackComponent={Error}>
            <GenerationProvider>
                <Game />
            </GenerationProvider>
        </ErrorBoundary>
    );
}
