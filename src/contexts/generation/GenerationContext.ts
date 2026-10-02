import { createContext, useContext } from "react";

import { GenerationClient } from "@/services/GenerationClient";

export const GenerationContext = createContext<GenerationClient | null>(null);

export function useGeneration() {
    const ctx = useContext(GenerationContext);
    if (!ctx) {
        throw new Error("useGeneration must be used within a GenerationProvider");
    }

    return ctx;
}
