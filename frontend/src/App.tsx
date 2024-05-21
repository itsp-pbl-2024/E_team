import './App.css';
import TopicGenerationButton from "./Questioner/TopicGenerationButton";
import AnswerBox from './answerbox/AnswerBox';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Top from "./top/Top";
import Settings from "./settings/Settings";
import ExplainBox from './Questioner/ExplainBox';

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
                <Link to={"/Questioner"}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        出題者
                    </button>
                </Link>
                <Link to={"/answerbox"}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        回答者
                    </button>
                </Link>
            </header>

            {/* パスごとに表示するコンポーネントを変える */}
            <Routes>
                <Route path='/' element={<Top/>}/>
                <Route path='/settings' element={<Settings/>}/>
                <Route path='/Questioner' element={<TopicGenerationButton/>}/>
                <Route path='/answerbox' element={<AnswerBox/>}/>

            </Routes>
        </div>
    );
}

export default App;
