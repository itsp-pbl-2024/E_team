import React, {useState} from 'react';
import './AnswerBox.css'
import {useSelector} from "react-redux";
import store, {StateType} from "../app/store";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExplainBox from '../Questioner/ExplainBox';
import ToQuestionerTransitionConfirm from '../transition_confirm/ToQuestionerTransitionConfirm';

function AnswerBox() {
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(false);
    const [isTransitionButtonDisabled, setIsTransitionButtonDisabled] = useState(false);

    const theme = useSelector((state: StateType) => state.theme.value)

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada bibendum arcu vitae elementum. Lobortis scelerisque fermentum dui faucibus in. Ut etiam sit amet nisl purus in mollis nunc sed. Nu******* tortor at auctor urna nunc. Eleifend mi in null*******. Nascetur ridiculus mus mauris vitae ultricies. Ac auctor augue mauris augue ****** gravida in fermentum et. Scelerisque varius morbi enim nunc faucibus a. In eu mi*******quam id diam. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Cras sed felis eget velit aliquet sagittis id consectetur. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus.vitae ultricies. Ac auctor augue mauris augue ****** gravida in fermentum et. Scelerisque varius morbi enim nunc faucibus a. In eu mi*******quam id diam. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Cras sed felis eget
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
            <Link to={"/to_questioner_transition_confirm"}>
                <button className='TransitionButton' disabled={isTransitionButtonDisabled}>
                    確定する
                </button>
            </Link>
            <Routes>
                <Route path='/to_questioner_transition_confirm' element={<ToQuestionerTransitionConfirm/>}/>
            </Routes>
        </div>
    );

}

export default AnswerBox;
