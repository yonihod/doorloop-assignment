import { useContext, useMemo, useRef } from "react";
import { GameContext } from "../Game";
import { WordObject } from "../types/types";

const Letter: React.FC<{ letter: string, termLetter: string }> = ({ letter, termLetter }) => {
    const correct = letter === termLetter;
    if (termLetter && correct)
        return <span className="text-white">{letter}</span>
    if (termLetter && !correct)
        return <span className="text-red-500">{letter}</span>
    return <span>{letter}</span>
}

const Word: React.FC<{ wordObject: WordObject, idx: number }> = ({ wordObject, idx }) => {

    const { word, isCorrect, isIncorrect, isInProgress } = wordObject;
    const { term, index } = useContext(GameContext);
    const el = useRef<HTMLDivElement>(null);

    const currentWord = useMemo(() => {
        return index === idx;
    }, [index, term])

    const wordClass = useMemo(() => {
        if (isCorrect) {
            return "correct";
        } else if (isIncorrect) {
            return "incorrect";
        } else if (isInProgress) {
            return "current";
        }
    }, [isCorrect, isIncorrect, isInProgress]);

    const createLetterView = () => {
        const wordArray = word.split("");
        const termArray = term.split("");
        const substring = word.substring(term.length);
        return (
            <>
                {
                    termArray.map(((letter, i) => <Letter letter={wordArray[i]} termLetter={letter} />))
                }
                {substring}
            </>
        )
    }

    const render = () => {
        if (isInProgress && currentWord) {
            return createLetterView();
        }
        if (isCorrect) {
            return <span>{word}</span>
        }
        if (isIncorrect) {
            return <span>{word}</span>
        }

        return <span>{word}</span>
    }


    return (
        <div id={`word-${idx}`} className={`inline-block mx-4 py-2 px-1 text-2xl ${wordClass}`}>
            {render()}
        </div>
    );
}

export default Word;