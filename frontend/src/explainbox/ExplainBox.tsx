import React, { useState } from 'react';
//import './AnswerBox.css'

function ExplainBox() {
  const [explanation, setExplanation] = useState('');

  const correctAnswer = 'hogehoge';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExplanation(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={explanation}
        onChange={handleInputChange}
        placeholder="Input explanation"
      />
    </div>
  );
}

export default ExplainBox;