interface CodeMatrixElementProps {
    element: string;
    isDisabled: boolean;
    onClick: () => void;
}

export function CodeMatrixElement({ element, isDisabled, onClick }: CodeMatrixElementProps) {
    return (
        <button
            className="flex justify-center items-center w-full h-full cursor-pointer uppercase"
            disabled={isDisabled}
            onClick={onClick}
        >
            {element}
        </button>
    );
}
