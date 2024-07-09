import '../../App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import AnswerBox from '../answerbox/AnswerBox';

function ToAnswerTransitionConfirm() {
    return (
        <div className="transition_confirm">
            <div className="bg-gradient-to-r from-red-300 to-emerald-200 p-2">出題者→回答者</div>
            <div className="m-6">
                <p className="text-lg">次は</p>
                <p className="text-3xl font-bold">回答画面</p>
            </div>

            <div className="m-10">
                <p className="text-lg">回答者へ</p>
                <p className="text-lg">交代してください</p>
            </div>

            <Link to={"/2team/answerbox"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    回答画面へ
                </button>
            </Link>
        </div>
    );

}

export default ToAnswerTransitionConfirm;
