import { Dispatch, SetStateAction, useCallback, useContext, useRef, useState } from "react";
import { GameContext } from "../Game";
import { WordObject } from "../types/types";

// implement input component
const Input = () => {

    const { updateTerm, term, updateIndex, words, index } = useContext(GameContext);
    const el = useRef<HTMLInputElement>(null);



    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        words[index].isInProgress = true;
        const { value } = e.target;
        updateTerm(value);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " ") { // space clicked
            //check if word is correct
            if (words[index].word === term) {
                words[index].isCorrect = true;
                words[index].isInProgress = false;
            } else {
                words[index].isIncorrect = true;
                words[index].isInProgress = false;
            }
            updateIndex(index + 1);
            updateTerm("");

            if (el.current) {
                el.current.value = "";
                el.current.blur();
                setTimeout(() => {
                    el.current?.focus();
                });
            }
            words[index + 1].isInProgress = true;
        } else if (e.key === "Backspace") {
            if (index > 0 && term === "") {
                words[index].isInProgress = false;
                words[index - 1].isInProgress = true;
                words[index - 1].isCorrect = false;
                words[index - 1].isIncorrect = false;
                updateIndex(index - 1);
            }
            updateTerm("");
        }
    }


    return (
        <div className="w-3/4 mx-auto mt-2 rounded-xl bg-white flex justify-center">
            <input type="text"
                className="mx-auto text-2xl w-11/12 text-center h-12 border-transparent focus:border-transparent focus-visible:outline-none focus:ring-0"
                placeholder="Type here"
                onChange={onChange}
                onKeyDown={onKeyDown}
                ref={el}
            />
        </div>
    );
}

export default Input;