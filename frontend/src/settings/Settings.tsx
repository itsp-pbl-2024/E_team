import React, {useEffect, useState} from "react";

function Settings() {

    const [test, setTest] = useState()

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL?.toString()??"")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setTest(result.message)
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
            </div>
        </>
    );
}

export default Settings;
