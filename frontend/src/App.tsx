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
import Logo from './img/logo.png';
import { ReactComponent as HelpImage } from './img/help.svg';
import { ReactComponent as SettingsImage } from './img/settings.svg';

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
                <nav className="flex justify-between bg-white w-full h-20 z-20 top-0 start-0 border-b border-gray-200">
                    <div className='flex-1'></div>
                    <Link to={"/"} className='flex-1 flex justify-center self-center'>
                        <img className="object-scale-down block h-8 m-2" src={Logo} alt="C∃ИS BR∃∀K" />
                    </Link>
                    <div className="flex-1 flex justify-end item-stretch">
                        <Link to={"/HowTo"} className="self-center">
                            <HelpImage className="block object-scale-down mx-2 w-10 h-8" />
                        </Link>
                        <Link to={"/settings"} className="self-center">
                            <SettingsImage className="block bject-scale-down my-auto mx-2 w-10 h-8 fill-white"/>
                        </Link>
                    </div>
                </nav>
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
                    <Route path='correct' element={<Correct2/>}/>
                    <Route path='wrong' element={<Wrong2/>}/>
                </Route>
            </Routes>
        </div>
    );
}