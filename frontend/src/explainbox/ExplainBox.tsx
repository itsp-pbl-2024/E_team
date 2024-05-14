import React, { useState } from 'react';
//import './AnswerBox.css'

function ExplainBox() {
    const [explanation, setExplanation] = useState('');
    const [censoredExplanation, setCensoredExplanation] = useState<string>('');

    const correctAnswer = 'hogehoge';
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExplanation(event.target.value);
    };

    const handleButtonClick = async () => {
        try {
            const response = await fetch((process.env.REACT_APP_BACKEND_URL?.toString()??"") + "/censor?"+
            "theme=hoge"+"&sentence="+explanation);
            if (response.ok) {
                const data = await response.json();
                setCensoredExplanation(data.censoredSentence);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
        <input
            type="text"
            value={explanation}
            onChange={handleInputChange}
            placeholder="Input explanation"
        />
        <button 
            onClick={handleButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >Send</button>
        <p>{censoredExplanation}</p>
        </div>       
    );
}

export default ExplainBox;