import React, {useEffect, useState} from "react";
import SwitchCensorButton from "./SwitchCensorButton";
import { useNavigate } from "react-router-dom";

function Settings() {

    const [test, setTest] = useState()
    const navigate = useNavigate()

    useEffect(() => {

        fetch((process.env.REACT_APP_BACKEND_URL?.toString()??"") + "/theme")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setTest(result.theme)
                },
                (error) => {
                }
            )
    }, [])

    const handleClose = () => {
        navigate(-1)
    }


    return (
        <>
            <div>
                設定です
                <span> {test} </span>
                <SwitchCensorButton />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>閉じる</button>
            </div>
        </>
    );
}

export default Settings;
