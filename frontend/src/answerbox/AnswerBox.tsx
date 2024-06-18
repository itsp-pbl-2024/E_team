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
      <input
        type="text"
        value={userAnswer}
        onChange={handleInputChange}
        placeholder="Enter your answer"
      />
      <button className='checkAnswerButton' onClick={checkAnswer} disabled={isCheckButtonDisabled}>Check</button>
      {isCorrect ? (
        <p className="correct">Correct!</p>
      ) : (
        <p className="incorrect">Incorrect. Try again!</p>
      )}
      <Link to={"/to_questioner_transition_confirm"}>
        <button className='TransitionButton' disabled={isTransitionButtonDisabled}>
          出題者画面へ
        </button>
      </Link>
      <Routes>
        <Route path='/to_questioner_transition_confirm' element={<ToQuestionerTransitionConfirm/>}/>
      </Routes>
    </div>
  );

}

export default AnswerBox;
