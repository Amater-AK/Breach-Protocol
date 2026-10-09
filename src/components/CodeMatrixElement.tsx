import { type Element } from "@/types";

interface CodeMatrixElementProps {
    element: Element;
    isEmpty: boolean;
    isDisabled: boolean;
    onClick: () => void;
}

export function CodeMatrixElement({ element, isEmpty, isDisabled, onClick }: CodeMatrixElementProps) {
    return (
        <div
            className={`border-4 border-double border-transparent ${!isDisabled ? "hover:text-outline active:text-outline hover:border-outline active:border-outline" : ""} transition-colors duration-150`}
        >
            <button
                className={`aspect-square flex justify-center items-center w-full h-full p-4 ${!isDisabled ? "cursor-pointer" : ""} ${isEmpty ? "text-empty" : ""} uppercase transition-colors duration-150`}
                disabled={isDisabled}
                onClick={onClick}
            >
                {isEmpty ? "[]" : element}
            </button>
        </div>
    );
}
