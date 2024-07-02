import '../index.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExplainBox from '../questioner/ExplainBox';
import React, {useState} from 'react';
import Players from '../players/Players';
import Settings from '../settings/Settings';
import Logo from '../img/logo.png'
import HowTo from '../help/HowTo';

function Home() {
    const [username, setUsername] = useState<string>('');
  

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };
  
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">

                <img className="block h-14 w-auto m-8" src={Logo} alt="C∃ИS BR∃∀K" />
                <Link to={"/players"}>
                    <button className="btn-primary w-40 my-2">
                        ゲーム開始
                    </button>
                </Link>
                <Link to={"/settings"}>
                    <button className="btn-primary w-40 my-2">
                        設定
                    </button>
                </Link>
                <Link to={"/Howto"}>
                    <button className="btn-primary w-40 my-2">
                        ヘルプ
                    </button>
                </Link>
            </div>
        </>
    );
}
  
export default Home;
