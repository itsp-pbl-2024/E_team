import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../app/store";
import { Link } from "react-router-dom";
import { Correct } from "./Correct"
import { Wrong } from "./Wrong";
import Processing from "./Processing";
import { wait } from "@testing-library/user-event/dist/utils";

enum CorrectStatus {
    Correct,
    Wrong,
    Processing
}

function Result() {

    const [correctStatus, setCorrectStatus] = useState<CorrectStatus>(CorrectStatus.Processing)
    const theme = useSelector((state: StateType) => state.history.value.currentGameStatusA.theme)
    const answer = useSelector((state: StateType) => state.history.value.currentGameStatusA.answers).at(-1)

    const checkAnswer = async () => {
        try {
            const response = await fetch((process.env.REACT_APP_BACKEND_URL?.toString() ?? "") + "/synonym", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ theme, answer }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data['is_synonym'] == true) {
                    setCorrectStatus(CorrectStatus.Correct)
                } else if (data['is_synonym'] == false) {
                    setCorrectStatus(CorrectStatus.Wrong)
                } else {
                    console.error('Error checking synonym');
                }
            } else {
                console.error('Error checking synonym');
            }
        } catch (error) {
            console.error('Error checking synonym:', error);
        }
    };


    useEffect(() => {
        checkAnswer()
    }, [])

    return (
        <>
            {correctStatus == CorrectStatus.Correct &&
                <Correct />
                || correctStatus == CorrectStatus.Wrong &&
                <Wrong />
                ||
                <Processing />
            }

        </>
    );
}

export default Result;
