import '../App.css';
import { useSelector } from "react-redux";
import { StateType } from "../app/store";
import { CensorType } from "../app/redux/settings";
import React, { useState, useContext } from 'react';
import TopicGenerationButton from "./TopicGenerationButton";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ToAnswerTransitionConfirm from '../transition_confirm/ToAnswerTransitionConfirm';

function ExplainBox() {
    const [explanation, setExplanation] = useState('');
    const [censoredExplanation, setCensoredExplanation] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isClicked, setIsClicked] = useState<Boolean>(false);
    const censorType: CensorType = useSelector((state: StateType) => state.settings.value.censorType)

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
            const response = await fetch((process.env.REACT_APP_BACKEND_URL?.toString() ?? "") + censorType.path, {
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
                setErrorMessage(null);
            } else {
                const errorData = await response.json();
                // console.error('Error fetching data');
                setErrorMessage(errorData.detail || 'Failed fetching data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Error fetching data')
        }
        setIsClicked(true);

    };

    return (

        <div>
            <TopicGenerationButton />

            <div className="flex flex-col items-center p-4">
                <textarea
                    value={explanation}
                    onChange={handleInputChange}
                    // className="border rounded p-4 md:w-96 h-32 "
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Input explanation"
                />
                <button
                    onClick={handleButtonClick}
                    className="flex flex-col bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2 disabled:bg-gray-500"
                    disabled={!explanation}
                >検閲する
                </button>
            </div>


            {errorMessage
                ? <div
                    className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">
                    <span className="font-medium">{errorMessage}</span>
                </div>
                : <>
                    {isClicked && <>
                        <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
                            平文
                        </h2>
                        <p>{explanation}</p>
                        <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
                            検閲済
                        </h2>
                        <p>{censoredExplanation}</p>

                    </>}
                </>


            }

            <Link to={"/to_answer_transition_confirm"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    回答者画面へ
                </button>
            </Link>
        </div>
    );
}

export default ExplainBox;