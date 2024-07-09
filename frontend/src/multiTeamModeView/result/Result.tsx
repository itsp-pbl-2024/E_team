import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {StateType} from "../../app/store";
import {Correct} from "./Correct"
import {Wrong} from "./Wrong";
import Processing from "./Processing";
enum CorrectStatus {
    Correct,
    Wrong,
    Processing
}

function Result() {
    const [correctStatusA, setCorrectStatusA] = useState<CorrectStatus>(CorrectStatus.Processing)
    const [correctStatusB, setCorrectStatusB] = useState<CorrectStatus>(CorrectStatus.Processing)

    const themeA = useSelector((state: StateType) => state.history.value.currentGameStatusA.theme)
    const answerA = useSelector((state: StateType) => state.history.value.currentGameStatusA.answers).at(-1)

    const themeB = useSelector((state: StateType) => state.history.value.currentGameStatusB.theme)
    const answerB = useSelector((state: StateType) => state.history.value.currentGameStatusB.answers).at(-1)

    const checkAnswer = async () => {
        try {
            fetch((process.env.REACT_APP_BACKEND_URL?.toString() ?? "") + "/synonym", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({theme: themeA, answer: answerA}),
            }).then(async (response) => {
                const data = await response.json();
                console.log(data);
                if (data['is_synonym'] == true) {
                    setCorrectStatusA(CorrectStatus.Correct)
                } else if (data['is_synonym'] == false) {
                    setCorrectStatusA(CorrectStatus.Wrong)
                } else {
                    console.error('Error checking synonym');
                }
            }).catch((e) => {
                console.log(e)
            });

            fetch((process.env.REACT_APP_BACKEND_URL?.toString() ?? "") + "/synonym", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({theme: themeB, answer: answerB}),
            }).then(async (response) => {
                const data = await response.json();
                console.log(data);
                if (data['is_synonym'] == true) {
                    setCorrectStatusB(CorrectStatus.Correct)
                } else if (data['is_synonym'] == false) {
                    setCorrectStatusB(CorrectStatus.Wrong)
                } else {
                    console.error('Error checking synonym');
                }
            }).catch((e) => {
                console.log(e)
            });
        } catch (error) {
            console.error('Error checking synonym:', error);
        }
    };

    useEffect(() => {
        checkAnswer()
    }, [])

    return (
        <>
            {(correctStatusA == CorrectStatus.Processing || correctStatusB == CorrectStatus.Processing) &&
                <Processing/>
                || (correctStatusA == CorrectStatus.Correct && correctStatusB == CorrectStatus.Correct) &&
                <Correct wonTeam={"両チーム"}/>
                || correctStatusA == CorrectStatus.Correct &&
                <Correct wonTeam={"Aチーム"}/>
                || correctStatusB == CorrectStatus.Correct &&
                <Correct wonTeam={"Bチーム"}/>
                || <Wrong/>
            }
        </>
    );
}

export default Result;
