import '../App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExplainBox from '../temp_questioner/ExplainBox';

function ToQuestionerTransitionConfirm() {
    console.log("In Transition Confirm");

  return (
    <div className="transition_confirm">
        <p>出題者画面へ遷移します。よろしいですか？</p>
        <Link to={"/Questioner"}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                OK!
            </button>
        </Link>
        <Routes>        
            <Route path='/Questioner' element={<ExplainBox/>}/>
        </Routes>
    </div>
  );

}

export default ToQuestionerTransitionConfirm;
