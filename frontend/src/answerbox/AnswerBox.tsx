import React, { useState } from 'react';
import './AnswerBox.css'
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../app/store";
import { Link } from "react-router-dom";
import { appendAnswerA } from "../app/redux/history";

function AnswerBox() {
    const [userAnswer, setUserAnswer] = useState('');

    const dispatch = useDispatch()
    const censoredExplanation = useSelector((state: StateType) => state.history.value.currentGameStatusA.censored_explanations).at(-1)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const confirm = () => {
        dispatch(appendAnswerA(userAnswer))
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
            /><br />
            <Link to={"/result"}>
                <button className='checkAnswerButton'
                    onClick={confirm}
                    disabled={!userAnswer}>
                    確定する
                </button>
            </Link>
        </div>
    );

}

export default AnswerBox;
