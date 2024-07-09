import '../App.css';
import {Link} from "react-router-dom";
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setMode } from '../app/redux/mode';

import Logo from '../img/logo.png'

function Home() {
    const [username, setUsername] = useState<string>('');
    const dispatch = useDispatch();

  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };

    const handleSingleMode = () => {
        dispatch(setMode('single'));
      };
    
      const handleDoubleMode = () => {
        dispatch(setMode('double'));
      };
  
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">

                <img className="block h-14 w-auto m-8" src={Logo} alt="C∃ИS BR∃∀K" />
                <Link to={"/players"}>
                    <button className="btn-primary w-60 my-2" onClick={handleSingleMode}>
                        ゲーム開始 (協力モード)
                    </button>
                </Link>
                <Link to={"/players"}>
                    <button className="btn-primary w-60 my-2" onClick={handleDoubleMode}>
                        ゲーム開始 (チーム戦モード)
                    </button>
                </Link>
                <Link to={"/settings"}>
                    <button className="btn-primary w-60 my-2">
                        設定
                    </button>
                </Link>
                <Link to={"/Howto"}>
                    <button className="btn-primary w-60 my-2">
                        ヘルプ
                    </button>
                </Link>
            </div>
        </>
    );
}
  
export default Home;
