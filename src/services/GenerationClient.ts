import { type Sequence, type Sequences, type Matrix } from "@/types";

const RERANDOM_LIMIT = 10;

export class GenerationClient {
    private _alphabet: string[];

    constructor(alphabetLength: number = 1) {
        this._alphabet = this.generateAlphabet(alphabetLength);
    }

    private getRandomHexValue(): string {
        return Math.floor(Math.random() * 256).toString(16);
    }

    private generateAlphabet(alphabetLength: number): string[] {
        const alphabet: string[] = [];

        for (let i = 0; i < alphabetLength; i++) {
            let hex = "";

            let rerandomIndex = 0;
            for (rerandomIndex = 0; rerandomIndex < RERANDOM_LIMIT; rerandomIndex++) {
                hex = this.getRandomHexValue();

                if (!alphabet.includes(hex)) break;
            }

            if (rerandomIndex === RERANDOM_LIMIT) {
                throw new Error("Alphabet generation failed: Rerandom limit reached.");
            }

            alphabet.push(hex);
        }

        return alphabet;
    }

    private getRandomAlphabetValue(): string {
        return this._alphabet[Math.floor(Math.random() * this._alphabet.length)];
    }

    public generateSequences(quantity: number = 1, length: number = 1): Sequences {
        const sequences: Sequences = [];
        for (let i = 0; i < quantity; i++) {
            const sequence: Sequence = [];

            for (let j = 0; j < length; j++) {
                sequence.push(this.getRandomAlphabetValue());
            }

            sequences.push(sequence);
        }

        return sequences;
    }

    public generateMatrix(size: number = 2): Matrix {
        const matrix: Matrix = [];

        for (let i = 0; i < size * size; i++) {
            matrix.push(this.getRandomAlphabetValue());
        }

        return matrix;
    }

    public reset(alphabetLength: number = 1) {
        this._alphabet = this.generateAlphabet(alphabetLength);
    }
}
