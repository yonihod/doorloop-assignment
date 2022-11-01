import { useState } from "react";
import Words from "./components/Words";

import { WORD_BANK } from "./data/wordbank";
import Logo from './logo.svg';

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

console.log(WORD_BANK.shuffle())
console.log(WORD_BANK.shuffle())

const Game = () => {

    const [inGame, setInGame] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [board, setBoard] = useState(WORD_BANK.shuffle());

    return (
        <div className="h-screen w-screen bg-white">
            <header className="max-w-4xl m-auto py-12 bg-slate-100 h-screen px-8">
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
                <div className="mt-8 mx-auto text-center">

                </div>
            </header>
            <main>
                {inGame ? (
                    <div>
                        inGame
                    </div>
                ) : (
                    <div>
                        not inGame
                    </div>
                )}
                {
                    showStats && 
                        <div>
                            showStats
                        </div>
                }

                <Words/>

            </main>
        </div>
    )
}

export default Game;
