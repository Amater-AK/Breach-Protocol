import { getErrorMessage, type FallbackProps } from "react-error-boundary";

export function Error({ error }: FallbackProps) {
    return (
        <div className="wrapper-wide flex flex-col justify-center items-center gap-2 h-svh" role="alert">
            <p className="text-text-attention">Something went wrong:</p>
            <pre className="text-fail">{getErrorMessage(error)}</pre>
        </div>
    );
}
