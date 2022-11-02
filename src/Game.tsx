import { createContext, useEffect, useState } from "react";
import Input from "./components/Input";
import Stats from "./components/Stats";
import Timer from "./components/Timer";
import Words from "./components/Words";

import { WORD_BANK } from "./data/wordbank";
import Logo from './logo.svg';
import { WordObject } from "./types/types";

// add shuffle to array prototype
Array.prototype.shuffle = function () {
    let i = this.length, j, temp;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

const TIME = 60;

const prepareBoardWords = (words: string[]): WordObject[] => {
    return words.map((word) => {
        return {
            word: word,
            isCorrect: false,
            isIncorrect: false,
            isInProgress: false,
            isPending: true,
            letterIndex: 0
        }
    })
}

export const GameContext = createContext({} as {
    words: WordObject[],
    index: number,
    updateTerm: (term: string) => void,
    updateIndex: (index: number) => void,
    term: string,
});



const Game = () => {

    const [inGame, setInGame] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [boardWords, setBoardWords] = useState<WordObject[]>(prepareBoardWords(WORD_BANK.shuffle()));
    const [index, setIndex] = useState(0);
    const [term, updateTerm] = useState("");

    useEffect(() => {
        if (term)
            setInGame(true);
    }, [term])

    const onEnd = () => {
        setInGame(false);
        setShowStats(true);
    }
    
    const restart = () => {
        setBoardWords(prepareBoardWords(WORD_BANK.shuffle()));
        setIndex(0);
        updateTerm("");
        setShowStats(false);
    }

    return (
        <GameContext.Provider value={{ words: boardWords, index: index, updateTerm: updateTerm, updateIndex: setIndex, term: term }}>
            <div className="h-screen w-screen bg-white">
                <div className="container max-w-4xl h-screen m-auto py-12 px-8 bg-slate-100">
                    <header>
                        <div className="flex flex-col gap-5">
                            <img src={Logo} className={"w-44"} alt="logo" />
                            <figure className="flex gap-2">
                                <a href="https://yonihodefi.dev" target="_blank" rel="noreferrer">
                                    <img src="yoni-circle.png" className="w-16 h-16 rounded-full" alt="Yoni Hodefi" />
                                </a>
                                <figcaption className="flex flex-col gap">
                                    <p className="text-md font-bold text-center">Typing speed game by </p>
                                    <a href={"https://www.yonihodefi.dev"} className={"text-orange-300 font-bold"}>
                                        Yoni Hodefi
                                    </a>
                                </figcaption>
                            </figure>
                        </div>
                    </header>
                    
                        {showStats && <Stats restart={restart}/>}
                        <main>
                        {!showStats && <Timer gameTime={TIME} onEnd={onEnd} start={inGame} />}
                            <Words />
                            <Input />
                        </main>
                    
                </div>
            </div>
        </GameContext.Provider>
    )
}

export default Game;
