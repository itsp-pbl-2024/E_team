import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {StateType} from "../app/store";
import {Link} from "react-router-dom";

enum CorrectStatus {
    Correct,
    Wrong,
    Processing
}

function Result() {

    const [correctStatus, setCorrectStatus] = useState<CorrectStatus>(CorrectStatus.Processing)
    const theme = useSelector((state: StateType) => state.history.value.currentStatus.theme)
    const answer = "キャンプファイヤー"

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch((process.env.REACT_APP_BACKEND_URL?.toString() ?? "") + "/synonym", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({theme, answer}),
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    if (data['is_synonym'] == true){
                        setCorrectStatus(CorrectStatus.Correct)
                    }else if (data['is_synonym'] == false){
                        setCorrectStatus(CorrectStatus.Wrong)
                    }else{
                        console.error('Error checking synonym');
                    }
                } else {
                    console.error('Error checking synonym');
                }
            } catch (error) {
                console.error('Error checking synonym:', error);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            {/* <button onClick={() => {setCorrectStatus(CorrectStatus.Correct)}}>
                correct
            </button> */}
            <Link to={"/correct"}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    正解画面
                </button>
            </Link>

            {/* <button onClick={() => {setCorrectStatus(CorrectStatus.Wrong)}}>
                wrong
            </button> */}
            <Link to={"/wrong"}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    不正解画面
                </button>
            </Link>
            <button onClick={() => {setCorrectStatus(CorrectStatus.Processing)}}>
                processing
            </button>
            {correctStatus == CorrectStatus.Correct &&
                <>
                    <div className="text-5xl">
                        ✓
                    </div>
                </> || correctStatus == CorrectStatus.Wrong &&
                <>
                    <div className="text-5xl">
                        ✗
                    </div>
                </>
                ||
                <>
                    <div className="text-5xl">
                        判定中...
                    </div>
                </>
            }

            <Link to={"/"}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    トップへ
                </button>
            </Link>
        </>
    );
}

export default Result;
