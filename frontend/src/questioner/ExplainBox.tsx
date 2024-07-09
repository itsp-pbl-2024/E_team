import '../App.css';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../app/store";
import {CensorType, DifficultyType} from "../app/redux/settings";
import React from 'react';
import {Link} from "react-router-dom";
import TopicGenerationButton from "./TopicGenerationButton";
import {appendCensoredExplanation, confirmExplanation, confirmTheme, updateExplanation} from "../app/redux/history";

function ExplainBox() {
    const dispatch = useDispatch()
    const theme = useSelector((state: StateType) => state.history.value.currentGameStatus.theme)
    const explanation = useSelector((state: StateType) => state.history.value.currentGameStatus.tmp_explanation)
    const censorType: CensorType = useSelector((state: StateType) => state.settings.value.censorType)
    const difficulty: DifficultyType = useSelector((state: StateType) => state.settings.value.difficulty)

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateExplanation(event.target.value))
    };

    const censorExplanation = async () => {
        dispatch(confirmTheme())
        dispatch(confirmExplanation())
        const requestBody = {
            text: explanation,
            theme: theme,
            difficulty: difficulty,
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
                dispatch(appendCensoredExplanation(data['censored_text']))
            } else {
                console.log(await response.json())
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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

            <Link to={"/to_answer_transition_confirm"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={censorExplanation}
                        disabled={!explanation}
                >
                    確定する
                </button>
            </Link>
        </div>
    );

}

export default ExplainBox;