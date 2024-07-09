import '../../App.css';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../app/store";
import {CensorType} from "../../app/redux/settings";
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import TopicGenerationButtonA from "./TopicGenerationButtonA";
import TopicGenerationButtonB from "./TopicGenerationButtonB";
import {
    appendCensoredExplanationA, appendCensoredExplanationB,
    confirmExplanationA, confirmExplanationB,
    confirmThemeA,
    confirmThemeB,
    updateExplanationA, updateExplanationB
} from "../../app/redux/history";

function ExplainBox() {
    const dispatch = useDispatch()
    const themeA = useSelector((state: StateType) => state.history.value.currentGameStatusA.theme)
    const explanationA = useSelector((state: StateType) => state.history.value.currentGameStatusA.tmp_explanation)
    const themeB = useSelector((state: StateType) => state.history.value.currentGameStatusB.theme)
    const explanationB = useSelector((state: StateType) => state.history.value.currentGameStatusB.tmp_explanation)
    const censorType: CensorType = useSelector((state: StateType) => state.settings.value.censorType)

    const [hideA, setHideA] = useState(true)
    const [hideB, setHideB] = useState(true)

    const handleInputChangeA = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateExplanationA(event.target.value))
    };
    const handleInputChangeB = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateExplanationB(event.target.value))
    };

    const censorExplanation = async () => {
        dispatch(confirmThemeA())
        dispatch(confirmExplanationA())
        dispatch(confirmThemeB())
        dispatch(confirmExplanationB())

        try {
            fetch((process.env.REACT_APP_BACKEND_URL?.toString() ?? "") + censorType.path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: explanationA,
                    theme: themeA,
                }),
            }).then(async (response) => {
                const data = await response.json();
                console.log(data);
                dispatch(appendCensoredExplanationA(data['censored_text']))
            }).catch((e) => {
                console.log(e)
            });
            fetch((process.env.REACT_APP_BACKEND_URL?.toString() ?? "") + censorType.path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: explanationB,
                    theme: themeB,
                }),
            }).then(async (response) => {
                const data = await response.json();
                console.log(data);
                dispatch(appendCensoredExplanationB(data['censored_text']))
            }).catch((e) => {
                console.log(e)
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className="flex">
                <div className="flex-auto">
                    <h1 className="text-4xl text-center font-bold"> チーム A</h1>
                    <TopicGenerationButtonA hide={hideA}/>
                    <div className="flex flex-col items-center p-4">
                        <textarea
                            value={hideA ? "" : explanationA}
                            disabled={hideA}
                            onChange={handleInputChangeA}
                            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Input explanation"
                        />
                    </div>
                    {hideA && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() => setHideA(false)}
                        >
                            見る
                        </button>
                        ||
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setHideA(true)}
                        >
                            隠す
                        </button>
                    }
                </div>
                <div className="flex-auto">
                    <h1 className="text-4xl text-center font-bold"> チーム B</h1>
                    <TopicGenerationButtonB hide={hideB}/>

                    <div className="flex flex-col items-center p-4">
                <textarea
                    value={hideB ? "" : explanationB}
                    disabled={hideB}
                    onChange={handleInputChangeB}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Input explanation"
                />
                    </div>

                    {hideB && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={() => setHideB(false)}
                        >
                            見る
                        </button>
                        ||
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setHideB(true)}
                        >
                            隠す
                        </button>
                    }
                </div>
            </div>
            <Link to={"/to_answer_transition_confirm"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={censorExplanation}
                        disabled={!explanationA || !explanationB}
                >
                    確定する
                </button>
            </Link>
        </div>
    );

}

export default ExplainBox;