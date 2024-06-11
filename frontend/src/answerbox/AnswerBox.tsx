import React, {useState} from 'react';
import './AnswerBox.css'
import {useSelector} from "react-redux";
import store, {StateType} from "../app/store";

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
    </div>
  );

}

export default AnswerBox;
