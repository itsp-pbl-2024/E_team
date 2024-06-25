import '../App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExplainBox from '../questioner/ExplainBox';
import React, {useState} from 'react';
import Players from '../players/Players';

function Home() {
    const [username, setUsername] = useState<string>('');
  

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };
  
    return (
        <>
            <h1>C∃ИS BR∃∀K</h1>
            

            <Link to={"/players"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    ゲーム開始
                </button>
            </Link>
            <Routes>
                <Route path='/players' element={<Players/>}/>
            </Routes>
        </>
    );
}
  
export default Home;
