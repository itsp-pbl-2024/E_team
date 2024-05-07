import React, { useState } from 'react';
import './AnswerBox.css'

function AnswerBox() {
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const correctAnswer = 'hogehoge';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userAnswer}
        onChange={handleInputChange}
        placeholder="Enter your answer"
      />
      <button onClick={checkAnswer}>Check</button>
      {isCorrect ? (
        <p style={{ color: 'green' }}>Correct!</p>
      ) : (
        <p style={{ color: 'red' }}>Incorrect. Try again!</p>
      )}
    </div>
  );
}

export default AnswerBox;
