import { useContext, useEffect, useState } from "react";
import { GameContext } from "../Game";
import Confetti from 'react-confetti';



const Stats: React.FC<{restart: ()=> void }> = ({ restart}) => {
    const { words } = useContext(GameContext);
    const [showConfetti, setShowConfetti] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShowConfetti(false);
        }, 1500)
    }, [])

    return (
        <>
            <div className="modal">
                <div className="modal-dialog">
                    {showConfetti && <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}

                    />}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Great Job!</h5>
                        </div>
                        <div className="modal-body">
                            <div className="flex justify-center">
                                <div className="chip bg-green-500 text-white">
                                    <h6>Correct:</h6>
                                    <p>{words.filter(word => word.isCorrect).length}</p>
                                </div>
                                <div className="chip bg-red-500 text-white">
                                    <h6>Incorrect:</h6>
                                    <p>{words.filter(word => word.isIncorrect).length}</p>
                                </div>
                            </div>
                            <h1 className="text-4xl mt-4">
                                Your score is {(words.filter(word => word.isCorrect).length / words.length * 100).toFixed(2)} Words per minute!
                            </h1>
                        </div>
                        <div className="modal-footer flex justify-center">
                            <button type="button" className="text-blue-500 text-2xl text-center" onClick={restart} >{"Go for another spin?"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Stats;
