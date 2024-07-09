import '../App.css';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../app/store";
import {CensorType, DifficultyType} from "../app/redux/settings";
import React from 'react';
import { Link } from "react-router-dom";
import TopicGenerationButton from "./TopicGenerationButton";
import { appendCensoredExplanationA, confirmExplanationA, confirmThemeA, updateExplanationA } from "../app/redux/history";

function ExplainBox() {
    const dispatch = useDispatch()
    const theme = useSelector((state: StateType) => state.history.value.currentGameStatusA.theme)
    const explanation = useSelector((state: StateType) => state.history.value.currentGameStatusA.tmp_explanation)
    const censorType: CensorType = useSelector((state: StateType) => state.settings.value.censorType)
    const difficulty: DifficultyType = useSelector((state: StateType) => state.settings.value.difficulty)

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateExplanationA(event.target.value))
    };

    const censorExplanation = async () => {
        dispatch(confirmThemeA())
        dispatch(confirmExplanationA())
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
                dispatch(appendCensoredExplanationA(data['censored_text']))
            } else {
                console.log(await response.json())
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <TopicGenerationButton />

            <div className="flex flex-col items-center p-4">
                <textarea
                    value={explanation}
                    onChange={handleInputChange}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Input explanation"
                />
            </div>

            <Link to={"/to_answer_transition_confirm"}>
                <button
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