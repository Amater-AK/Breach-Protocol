import { MATRIX_DIRECTION } from "@/consts";

export type MatrixDirection = (typeof MATRIX_DIRECTION)[keyof typeof MATRIX_DIRECTION];
