import { useState, useEffect } from "react";

interface TimerProps {
    duration: number;
    isRunning: boolean;
    onTimeOut: () => void;
}

export function Timer({ duration, isRunning, onTimeOut }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                const nextTImeLeft = prevTimeLeft - 10;
                if (nextTImeLeft <= 0) {
                    clearInterval(intervalId);
                    onTimeOut();

                    return 0;
                }

                return nextTImeLeft;
            });
        }, 10);

        return () => clearInterval(intervalId);
    }, [isRunning, timeLeft, onTimeOut]);

    return (
        <div className="flex flex-col gap-1 w-60">
            <div className="flex justify-between items-center gap-4">
                <p>Remainig time</p>
                <div className=" p-1 border border-stone-600">{(timeLeft / 1000).toFixed(2)}</div>
            </div>
            <div className="border border-stone-600">
                <div
                    className="w-(--fill-percent) h-2 bg-stone-600"
                    style={
                        {
                            "--fill-percent": `${(timeLeft / duration) * 100}%`,
                        } as React.CSSProperties
                    }
                ></div>
            </div>
        </div>
    );
}
