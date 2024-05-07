// import {Link} from "react-router-dom";
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import LinkButton from "./children/LinkButton";
// import { useState } from "react";
// import TopicGenerationButton from "./Questioner/TopicGenerationButton";

// function App() {
//   const title: string="Hello World!";
//   return (
//     <div className="App">
//       <h1>{title}</h1>
//       <LinkButton text='ボタン' link="/test" />
//     </div>
//   );
// } 

// export default App;


import AnswerBox from './answerbox/AnswerBox';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Top from "./top/Top";
import Settings from "./settings/Settings";

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
                
            </Routes>
            <AnswerBox />
        </div>
    );
}

export default App;
