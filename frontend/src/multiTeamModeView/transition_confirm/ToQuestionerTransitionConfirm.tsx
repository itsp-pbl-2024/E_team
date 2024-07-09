import '../../App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExplainBox from '../questioner/ExplainBox';

function ToQuestionerTransitionConfirm() {
    return (
        <div className="transition_confirm">
            <div className="bg-gradient-to-r from-emerald-200 to-red-300 p-2">回答者→出題者</div>
            <div className="m-6">
                <p className="text-lg">次は</p>
                <p className="text-3xl font-bold">出題画面</p>
            </div>

            <div className="m-10">
                <p className="text-lg">出題者へ</p>
                <p className="text-lg">交代してください</p>
            </div>

            <Link to={"/2team/Questioner"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    出題画面へ
                </button>
            </Link>
        </div>
    );

}

export default ToQuestionerTransitionConfirm;
