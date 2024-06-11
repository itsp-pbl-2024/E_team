import React from "react";
import '../App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExplainBox from '../Questioner/ExplainBox';

function Top() {
    return (
        <div>
            <p>トップです</p>
            <Link to={"/Questioner"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    ゲーム開始
                </button>
            </Link>
            <Routes>
                <Route path='/Questioner' element={<ExplainBox/>}/>
            </Routes>
        </div>
    );
}

export default Top;
