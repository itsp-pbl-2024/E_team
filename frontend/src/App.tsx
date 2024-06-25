import './App.css';
import TopicGenerationButton from "./questioner/TopicGenerationButton";
import AnswerBox from './answerbox/AnswerBox';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Players from "./players/Players";
import Home from "./home/Home";
import Settings from "./settings/Settings";
import ExplainBox from './questioner/ExplainBox';
import ToAnswerTransitionConfirm from './transition_confirm/ToAnswerTransitionConfirm';
import ToQuestionerTransitionConfirm from './transition_confirm/ToQuestionerTransitionConfirm';
import Result from "./result/Settings";
import { Outlet, useLocation } from 'react-router-dom';
import { ReactNode } from "react";

const Layout = ({ hideHeaderPaths = [] }: {hideHeaderPaths: string[]}) => {
    const { pathname } = useLocation();
    return (
        <>
            {!hideHeaderPaths.includes(pathname) &&
                <header>
                    <Link to={"/"}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Home
                        </button>
                    </Link>
                    <Link to={"/settings"}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            設定
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
                    <Route path='/' element={<Home/>}/>
                    <Route path='/players' element={<Players/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                    <Route path='/questioner' element={<ExplainBox/>}/>
                    <Route path='/answerbox' element={<AnswerBox/>}/>
                    <Route path='/to_answer_transition_confirm' element={<ToAnswerTransitionConfirm/>}/>
                    <Route path='/result' element={<Result/>}/>
                    <Route path='/to_questioner_transition_confirm' element={<ToQuestionerTransitionConfirm/>}/>
                </Route>
            </Routes>
        </div>
    );
}