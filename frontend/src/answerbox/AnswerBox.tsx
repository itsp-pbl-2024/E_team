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

    const theme = useSelector((state: StateType) => state.theme.value)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const checkAnswer = () => {
        if (userAnswer.toLowerCase() === theme.toLowerCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

  return (
    <div className="answer-box">
      <input
        type="text"
        value={userAnswer}
        onChange={handleInputChange}
        placeholder="Enter your answer"
      />
      <button onClick={checkAnswer}>Check</button>
      {isCorrect ? (
        <p className="correct">Correct!</p>
      ) : (
        <p className="incorrect">Incorrect. Try again!</p>
      )}
      <Link to={"/to_questioner_transition_confirm"}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          出題者
        </button>
      </Link>
      <Routes>
        <Route path='/to_questioner_transition_confirm' element={<ToQuestionerTransitionConfirm/>}/>
      </Routes>
      
    </div>
  );

}

export default AnswerBox;
