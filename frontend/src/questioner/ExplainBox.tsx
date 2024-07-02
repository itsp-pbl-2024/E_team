import '../App.css';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../app/store";
import {CensorType} from "../app/redux/settings";
import React, {useState, useContext} from 'react';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import TopicGenerationButton from "./TopicGenerationButton";
import {UserProperty} from "../players/Players";
import {appendCensoredExplanation, confirmExplanation, confirmTheme, updateExplanation} from "../app/redux/history";

function ExplainBox() {
    const [censoredExplanation, setCensoredExplanation] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useDispatch()
    const theme = useSelector((state: StateType) => state.history.value.currentStatus.theme)
    const explanation = useSelector((state: StateType) => state.history.value.currentStatus.tmp_explanation)
    const censorType: CensorType = useSelector((state: StateType) => state.settings.value.censorType)

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateExplanation(event.target.value))
    };

    const confirm = () => {
        dispatch(confirmTheme())
        dispatch(confirmExplanation())
    }

    const censorExplination = async () =>{
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
                dispatch(appendCensoredExplanation(data['censored_text']))
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
    }

    return (
        <div>
            <TopicGenerationButton/>

            <div className="flex flex-col items-center p-4">
                <textarea
                    value={explanation}
                    onChange={handleInputChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Input explanation"
                />
            </div>

            {errorMessage
                ? <div
                    className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300">
                    <span className="font-medium">{errorMessage}</span>
                </div>
                : <></>
            }
            <Link to={"/to_answer_transition_confirm"}>
                <button //className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>{
                            confirm;
                            censorExplination;
                        }}
                        className="flex flex-col bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2 disabled:bg-gray-500"
                        disabled={!explanation}
                        //onClick={handleButtonClick}
                        >
                    確定する
                </button>
            </Link>
        </div>
    );

}

export default ExplainBox;