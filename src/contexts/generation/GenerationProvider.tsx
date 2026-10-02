import { useMemo } from "react";

import { GenerationContext } from "./GenerationContext";

import { GenerationClient } from "@/services/GenerationClient";

interface GenerationProviderProps {
    children: React.ReactNode;
}

export function GenerationProvider({ children }: GenerationProviderProps) {
    const client = useMemo(() => new GenerationClient(4), []);

    return <GenerationContext value={client}>{children}</GenerationContext>;
}
