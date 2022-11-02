import { useContext, useEffect, useState } from "react";
import { GameContext } from "../Game";
import Word from "./Word";

const Words = () => {
    const {words, index} = useContext(GameContext);
    const [transformV, setTransformV] = useState(0);
    
    useEffect(() => {
        if( index > 0 && index % 6 === 0 ){
            setTransformV(transformV + 1);
        }
    }, [index])

    return (
        <div id="words" className={"mx-auto w-3/4 rounded-xl border h-44 bg-white overflow-hidden relative box-border py-5"} style={{lineHeight: "3rem"}}>
            <div className="words-container absolute" style={{
                transform: `translateY(-${transformV * 3}rem)`,
                transition: "transform 0.5s ease-in-out"
            }}>
                {words.map(( word, i) => (
                    <Word key={i} wordObject={word} idx={i} />
                ))}
            </div>
        </div>
    );
}

export default Words