import React, {useEffect, useState} from "react";
import SwitchCensorButton from "./SwitchCensorButton";

function Settings() {

    const [test, setTest] = useState()

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
    return (
        <>
            <div>
                設定です
                <span> {test} </span>
                <SwitchCensorButton />
            </div>
        </>
    );
}

export default Settings;
