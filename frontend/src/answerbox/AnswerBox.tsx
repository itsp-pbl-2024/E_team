import React, {useState} from 'react';
import './AnswerBox.css'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../app/store";
import {Link} from "react-router-dom";
import {appendAnswer} from "../app/redux/history";

function AnswerBox() {
    const [userAnswer, setUserAnswer] = useState('');

    const dispatch = useDispatch()
    const censoredExplanation = useSelector((state: StateType) => state.history.value.currentGameStatus.censored_explanations).at(-1)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const confirm = () => {
        dispatch(appendAnswer(userAnswer))
    }

    return (
        <div className="answer-box">
            <div className="bg-emerald-200 p-2">回答者</div>
            <div className="m-10 max-h-60 overflow-y-scroll border p-1">
                {/*    検閲された文章 */}
                {censoredExplanation}
            </div>
            <input
                type="text"
                value={userAnswer}
                onChange={handleInputChange}
                placeholder="Enter your answer"
                className="m-4"
            /><br/>
            {/*<button className='checkAnswerButton' onClick={checkAnswer} disabled={isCheckButtonDisabled}>Check</button>*/}
            {/*{isCorrect ? (*/}
            {/*    <p className="correct">Correct!</p>*/}
            {/*) : (*/}
            {/*    <p className="incorrect">Incorrect. Try again!</p>*/}
            {/*)}*/}
            <Link to={"/result"}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={confirm}>
                    確定する
                </button>
            </Link>
        </div>
    );

}

export default AnswerBox;
