import React, { useState } from 'react';
import TopicGenerationButton from "./TopicGenerationButton";
import {useSelector} from "react-redux";
import store, {StateType} from "../app/store";

function ExplainBox() {
    const [explanation, setExplanation] = useState('');
    const [censoredExplanation, setCensoredExplanation] = useState<string>('');

    const theme = useSelector((state: StateType) => state.theme.value)

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExplanation(event.target.value);
    };

    const handleButtonClick = async () => {
        const requestBody = {
            text: explanation,
            theme: theme,
        };
        try {
            const response = await fetch((process.env.REACT_APP_BACKEND_URL?.toString()??"") + "/censor", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCensoredExplanation(data['censored_text']);
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
        </div>       
    );
}

export default ExplainBox;