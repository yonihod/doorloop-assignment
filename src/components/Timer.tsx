import React, { useEffect, useState } from "react";

const Timer: React.FC<{ gameTime: number, onEnd: () => void, start: boolean }> = ({ gameTime, onEnd, start }) => {
    const [time, setTime] = useState(gameTime * 1000);

    useEffect(() => {
        if (!start) return;

        let timer: NodeJS.Timeout;
        if (time > 0) {
            timer = setTimeout(() => {
                setTime(time - 1000);
            }, 1000)
        }
        else {
            onEnd();
        }
        return () => clearTimeout(timer);
    }, [time, start])

    if (!start) {
        return (
            <div className={`text-xl mx-auto text-right w-3/4 text-black`}>
                {gameTime}
            </div>
        );
    }

    return (

        <div className={`text-xl mx-auto text-right w-3/4 ${time > 10000 ? "text-black" : "text-red-600"}`}>
            {time / 1000}
        </div>
    )

}

export default Timer;