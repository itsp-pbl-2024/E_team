import '../index.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import Players from '../players/Players';
import Logo from '../img/logo.png'
import Button from '@mui/material/Button';

function Home() {
    const [username, setUsername] = useState<string>('');
  

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };
  
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">

                <img className="block h-8 w-auto m-8" src={Logo} alt="C∃ИS BR∃∀K" width={100} height={100} />
                <Link to={"/players"}>
                    <Button variant='contained' className="w-40 my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        ゲーム開始
                    </Button>
                </Link>
                <Link to={"/settings"}>
                    <Button variant='contained' className="w-40 my-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        設定
                    </Button>
                </Link>
            </div>

            <Routes>
                <Route path='/players' element={<Players/>}/>
            </Routes>
        </>
    );
}
  
export default Home;
