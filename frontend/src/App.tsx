import './App.css';
import AnswerBox from './answerbox/AnswerBox';
import {Link, Route, Routes, Outlet, useLocation} from "react-router-dom";
import Players from "./players/Players";
import Home from "./home/Home";
import Settings from "./settings/Settings";
import ExplainBox from './questioner/ExplainBox';
import ToAnswerTransitionConfirm from './transition_confirm/ToAnswerTransitionConfirm';
import ToQuestionerTransitionConfirm from './transition_confirm/ToQuestionerTransitionConfirm';
import HowTo from './help/HowTo';
import Result from "./result/Result";

import {useDispatch} from "react-redux";
import {resetCurrentGame} from "./app/redux/history";

import ExplainBox2 from './multiTeamModeView/questioner/ExplainBox';
import AnswerBox2 from './multiTeamModeView/answerbox/AnswerBox';
import Result2 from "./multiTeamModeView/result/Result";
import Correct2 from "./multiTeamModeView/result/Correct";
import Wrong2 from "./multiTeamModeView/result/Wrong";
import ToAnswerTransitionConfirm2 from './multiTeamModeView/transition_confirm/ToAnswerTransitionConfirm';
import ToQuestionerTransitionConfirm2 from './multiTeamModeView/transition_confirm/ToQuestionerTransitionConfirm';


const Layout = ({hideHeaderPaths = []}: { hideHeaderPaths: string[] }) => {
    const {pathname} = useLocation();

    const dispatch = useDispatch()

    const reset = () => {
        dispatch(resetCurrentGame())
    }

    return (
        <>
            {!hideHeaderPaths.includes(pathname) &&
                <header>
                    <Link to={"/"} onClick={reset}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Home
                        </button>
                    </Link>
                    <Link to={"/settings"}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            設定
                        </button>
                    </Link>
                    <Link to={"/HowTo"}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            ヘルプ
                        </button>
                    </Link>
                </header>
            }
            <Outlet/>
        </>
    );
};

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<Layout hideHeaderPaths={["/"]}/>}>
                    <Route path='/' element={<Home/>}/>x
                    <Route path='/players' element={<Players/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                    <Route path='/questioner' element={<ExplainBox/>}/>
                    <Route path='/answerbox' element={<AnswerBox/>}/>
                    <Route path='/to_answer_transition_confirm' element={<ToAnswerTransitionConfirm/>}/>
                    <Route path='/result' element={<Result/>}/>
                    <Route path='/to_questioner_transition_confirm' element={<ToQuestionerTransitionConfirm/>}/>
                    <Route path='/HowTo' element={<HowTo/>}/>
                </Route>
                <Route path="/2team" element={<Layout hideHeaderPaths={["/"]}/>}>
                    <Route path='questioner' element={<ExplainBox2/>}/>
                    <Route path='answerbox' element={<AnswerBox2/>}/>
                    <Route path='to_answer_transition_confirm' element={<ToAnswerTransitionConfirm2/>}/>
                    <Route path='to_questioner_transition_confirm' element={<ToQuestionerTransitionConfirm2/>}/>
                    <Route path='result' element={<Result2/>}/>
                    <Route path='correct' element={<Correct2 wonTeam={"Noneチーム"}/>}/>
                    <Route path='wrong' element={<Wrong2/>}/>
                </Route>
            </Routes>
        </div>
    );
}