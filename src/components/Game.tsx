import { useGeneration } from "@/contexts/generation/GenerationContext";

export function Game() {
    const generation = useGeneration();

    console.log(generation.generateSequences(2, 3));
    console.log(generation.generateMatrix(3));

    return 123;
}
