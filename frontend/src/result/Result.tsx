import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

enum CorrectStatus {
    Correct,
    Wrong,
    Processing
}

function Result() {

    const [correctStatus, setCorrectStatus] = useState<CorrectStatus>(CorrectStatus.Processing)

    useEffect(() => {
    }, [])

    return (
        <>
            <button onClick={() => {setCorrectStatus(CorrectStatus.Correct)}}>
                correct
            </button>
            <button onClick={() => {setCorrectStatus(CorrectStatus.Wrong)}}>
                wrong
            </button>
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
