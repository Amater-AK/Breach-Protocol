import { type Sequence, type Sequences, type Matrix, type GenerationConfig } from "@/types";

import { getMatrixRowIndices, getMatrixColIndices } from "@/utils";

const RERANDOM_LIMIT = 10;

export class GenerationClient {
    private _alphabet: string[];
    private _lastMatrix: Matrix;
    private _lastSequences: Sequences;

    constructor() {
        this._alphabet = [];
        this._lastMatrix = [];
        this._lastSequences = [];
    }

    private getRandomHexValue(): string {
        return Math.floor(Math.random() * 256).toString(16);
    }

    private generateAlphabet(alphabetLength: number): string[] {
        const alphabet: string[] = [];

        for (let i = 0; i < alphabetLength; i++) {
            let hex = "";

            let rerandomIndex = 0;
            for (rerandomIndex; rerandomIndex < RERANDOM_LIMIT; rerandomIndex++) {
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

    public generateRandomSequences(quantity: number, length: number): Sequences {
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

    private generateSequences(quantity: number, length: number): Sequences {
        const sequences: Sequences = [];

        const size = Math.sqrt(this._lastMatrix.length);

        const startPositionIndices = Array.from(this._lastMatrix, (_, index) => index);
        startPositionIndices.sort(() => Math.random() - 0.5);

        for (let i = 0; i < quantity; i++) {
            const sequence: Sequence = [];

            // Получение первого элемента
            const startPositionIndex = Math.floor(Math.random() * this._lastMatrix.length);
            sequence.push(this._lastMatrix[startPositionIndex]);

            let col = startPositionIndex % size;
            let row = (startPositionIndex - col) / size;
            let lastElementIndex = startPositionIndex;
            let isRow = false; // Первым направлением была строка

            for (let j = 1; j < length; j++) {
                let candidateIndices: number[];

                if (isRow) {
                    candidateIndices = getMatrixRowIndices(this._lastMatrix, row).filter(
                        (index) => index !== lastElementIndex,
                    );
                } else {
                    candidateIndices = getMatrixColIndices(this._lastMatrix, col).filter(
                        (index) => index !== lastElementIndex,
                    );
                }
                if (candidateIndices.length === 0) {
                    throw new Error(
                        "Sequences generation failed: No available candidates for the element. Sequence length is too great.",
                    );
                }

                const newIndex = Math.floor(Math.random() * candidateIndices.length);

                lastElementIndex = newIndex;
                col = newIndex % size;
                row = (newIndex - col) / size;
                sequence.push(this._lastMatrix[newIndex]);

                isRow = !isRow;
            }

            sequences.push(sequence);
        }

        return sequences;
    }

    private generateMatrix(size: number): Matrix {
        const matrix: Matrix = [];

        for (let i = 0; i < size * size; i++) {
            matrix.push(this.getRandomAlphabetValue());
        }

        return matrix;
    }

    public getSequences(): Sequences {
        return this._lastSequences;
    }

    public getMatrix(): Matrix {
        return this._lastMatrix;
    }

    public generate(config: GenerationConfig) {
        this._alphabet = this.generateAlphabet(config.alphabetLength);
        this._lastMatrix = this.generateMatrix(config.matrixSize);
        this._lastSequences = this.generateSequences(config.sequenceQuantity, config.sequenceLength);
    }
}
