import { useState, useRef, useEffect } from "react";

interface TimerProps {
    duration: number;
    isRunning: boolean;
    onTimeOut: () => void;
}

export function Timer({ duration, isRunning, onTimeOut }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);

    const timeLeftRef = useRef(duration);
    timeLeftRef.current = timeLeft;

    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            const nextTimeLeft = timeLeftRef.current - 10;
            if (nextTimeLeft > 0) {
                setTimeLeft(nextTimeLeft);
            } else {
                setTimeLeft(0);
                clearInterval(intervalId);
                onTimeOut();
            }

            return nextTimeLeft;
        }, 10);

        return () => clearInterval(intervalId);
    }, [isRunning, onTimeOut]);

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
