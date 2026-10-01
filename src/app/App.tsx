import { GenerationClient } from "@/generation/GenerationClient";

const generationClient = new GenerationClient(4);

export function App() {
    console.log("matrix", generationClient.generateMatrix(4));
    console.log("sequences", generationClient.generateSequences(2, 3));

    return <p className="font-bold text-amber-700">Test</p>;
}
