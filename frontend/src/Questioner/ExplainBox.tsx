import '../App.css';
import React, { useState } from 'react';
import TopicGenerationButton from "./TopicGenerationButton";
import {useSelector} from "react-redux";
import store, {StateType} from "../app/store";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ToAnswerTransitionConfirm from '../transition_confirm/ToAnswerTransitionConfirm';

function ExplainBox() {
    const [explanation, setExplanation] = useState('');
    const [censoredExplanation, setCensoredExplanation] = useState<string>('');

    const theme = useSelector((state: StateType) => state.theme.value)

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExplanation(event.target.value);
    };

    const handleButtonClick = async () => {
        try {
            const response = await fetch((process.env.REACT_APP_BACKEND_URL?.toString()??"") + "/censor?"+
            "theme="+theme+"&sentence="+explanation);
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
        <TopicGenerationButton />
        <textarea
            value={explanation}
            onChange={handleInputChange}
            className="border rounded p-4 md:w-96 h-32 "
            placeholder="Input explanation"
        />
        <button 
            onClick={handleButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2"
        >検閲する</button>
        <p>これは平文　　{explanation}</p>
        <p>これは検閲済　{censoredExplanation}</p>
        <Link to={"/to_answer_transition_confirm"}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                回答者
            </button>
        </Link>
        <Routes>
            <Route path='/to_answer_transition_confirm' element={<ToAnswerTransitionConfirm/>}/>
        </Routes>
        </div>
        
    );
}

export default ExplainBox;