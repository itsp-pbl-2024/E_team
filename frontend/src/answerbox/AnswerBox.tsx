import React, {useState} from 'react';
import './AnswerBox.css'
import {useSelector} from "react-redux";
import store, {StateType} from "../app/store";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExplainBox from '../questioner/ExplainBox';
import ToQuestionerTransitionConfirm from '../transition_confirm/ToQuestionerTransitionConfirm';

function AnswerBox() {
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(false);
    const [isTransitionButtonDisabled, setIsTransitionButtonDisabled] = useState(false);

    const theme = useSelector((state: StateType) => state.theme.value)
    // Reduxに合わせて変更
    const explanation = useSelector((state: StateType) => state.theme.value)
    const censoredExplanation = useSelector((state: StateType) => state.theme.value)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const checkAnswer = () => {
        if (userAnswer.toLowerCase() === theme.toLowerCase()) {
            setIsCorrect(true);
            setIsTransitionButtonDisabled(true);
        } else {
            setIsCorrect(false);
        }
        setIsCheckButtonDisabled(true);
    };

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
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' disabled={isTransitionButtonDisabled}>
                    確定する
                </button>
            </Link>
        </div>
    );

}

export default AnswerBox;
