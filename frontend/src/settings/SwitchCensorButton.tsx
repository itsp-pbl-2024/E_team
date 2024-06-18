import React, { useState, useContext } from 'react';
import { TextContext } from '../TextContext';

function SwitchButton() {
    const [endpoint, setEndpoint] = useState('/censor');
    const textContext = useContext(TextContext);
    const [currentCensor, setCurrentCensor] = useState(() => {
        if (textContext?.text === '/censor') {
            return 'spaCy';
        } else if (textContext?.text === '/censor/chatgpt') {
            return 'chatGPT';
        } else {
            return '未設定';
        }
    });

    const handleSwitch = (newEndpoint: string) => {
        setEndpoint(newEndpoint);
        textContext?.setText(newEndpoint);
        setCensor(newEndpoint);
    };
    
    const setCensor = (newEndpoint: string) =>{
        if (newEndpoint=="/censor"){
            setCurrentCensor("spaCy");
        } else if (newEndpoint=="/censor/chatgpt"){
            setCurrentCensor("chatGPT");
        }
    };

    return (
        <div>
            <a>検閲官を選択 : </a>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSwitch('/censor')}>spaCy</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSwitch('/censor/chatgpt')}>chatGPT</button>
            <p>現在の検閲官 : {currentCensor}</p>
            <p>Current endpoint: {endpoint}</p>
        </div>
    );
}

export default SwitchButton;
