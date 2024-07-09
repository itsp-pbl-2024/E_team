import React, {useState} from 'react';
import './AnswerBox.css'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../app/store";
import {Link} from "react-router-dom";
import {appendAnswerA, appendAnswerB} from "../../app/redux/history";

function AnswerBox() {
    const [userAnswerA, setUserAnswerA] = useState('');
    const [userAnswerB, setUserAnswerB] = useState('');

    const [hideA, setHideA] = useState(true)
    const [hideB, setHideB] = useState(true)

    const dispatch = useDispatch()
    const censoredExplanationA = useSelector((state: StateType) => state.history.value.currentGameStatusA.censored_explanations).at(-1)
    const censoredExplanationB = useSelector((state: StateType) => state.history.value.currentGameStatusB.censored_explanations).at(-1)

    const handleInputChangeA = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswerA(event.target.value);
    };
    const handleInputChangeB = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswerB(event.target.value);
    };

    const confirm = () => {
        dispatch(appendAnswerA(userAnswerA))
        dispatch(appendAnswerB(userAnswerB))
    }

    return (
        <div className="answer-box">
            <div className="bg-emerald-200 p-2">回答者</div>
            <div className="flex">
                <div className="flex-auto">
                    <h1 className="text-4xl text-center font-bold"> チーム A</h1>
                    <div className="m-10 max-h-60 overflow-y-scroll border p-1">
                        {hideA || censoredExplanationA}
                    </div>
                    <input
                        type="text"
                        value={hideA ? "" : userAnswerA}
                        disabled={hideA}
                        onChange={handleInputChangeA}
                        placeholder="Enter your answer"
                        className="m-4"
                    /><br/>
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
                    <div className="m-10 max-h-60 overflow-y-scroll border p-1">
                        {hideB || censoredExplanationB}
                    </div>
                    <input
                        type="text"
                        value={hideB ? "" : userAnswerB}
                        disabled={hideB}
                        onChange={handleInputChangeB}
                        placeholder="Enter your answer"
                        className="m-4"
                    /><br/>
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
            <Link to={"/2team/result"}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={confirm}>
                    確定する
                </button>
            </Link>
        </div>
    );

}

export default AnswerBox;
