import '../App.css';
import React, {useState} from 'react';
import {useSelector} from "react-redux";
import store, {StateType} from "../app/store";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExplainBox from '../Questioner/ExplainBox';
import AnswerBox from '../answerbox/AnswerBox';

function ToAnswerTransitionConfirm() {
    console.log("In Transition Confirm");

  return (
    <div className="transition_confirm">
        <p>回答者画面へ遷移します。よろしいですか？</p>
        <Link to={"/answerbox"}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                OK!
            </button>
        </Link>
        <Routes>        
            <Route path='/answerbox' element={<AnswerBox/>}/>
        </Routes>
      
    </div>
  );

}

export default ToAnswerTransitionConfirm;
