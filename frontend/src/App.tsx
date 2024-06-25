import './App.css';
import AnswerBox from './answerbox/AnswerBox';
import {Link, Route, Routes} from "react-router-dom";
import Top from "./top/Top";
import Settings from "./settings/Settings";
import ExplainBox from './Questioner/ExplainBox';
import ToAnswerTransitionConfirm from './transition_confirm/ToAnswerTransitionConfirm';
import ToQuestionerTransitionConfirm from './transition_confirm/ToQuestionerTransitionConfirm';
import Result from "./result/Result";


function App() {
    return (
        <div className="App">
            {/* ヘッダー、すべての画面に表示される*/}
            <header>
                <Link to={"/"}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        トップ
                    </button>
                </Link>
                <Link to={"/settings"}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        設定
                    </button>
                </Link>
            </header>

            {/* パスごとに表示するコンポーネントを変える */}
            <Routes>
                <Route path='/' element={<Top/>}/>
                <Route path='/settings' element={<Settings/>}/>
                <Route path='/Questioner' element={<ExplainBox/>}/>
                <Route path='/answerbox' element={<AnswerBox/>}/>
                <Route path='/to_answer_transition_confirm' element={<ToAnswerTransitionConfirm/>}/>
                <Route path='/result' element={<Result/>}/>
                <Route path='/to_questioner_transition_confirm' element={<ToQuestionerTransitionConfirm/>}/>
            </Routes>
        </div>
    );
}

export default App;
