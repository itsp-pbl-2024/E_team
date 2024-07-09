import {useState} from "react";
import './TopicGenerationButton.css'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../app/store";
import {changeThemeA, changeThemeB} from "../../app/redux/history";

function TopicGenerationButton(props: { hide: boolean }) {
    const dispatch = useDispatch()
    const theme = useSelector((state: StateType) => state.history.value.currentGameStatusB.theme)
    const theme_confirmed = useSelector((state: StateType) => state.history.value.currentGameStatusB.theme_confirmed)
    const GenerateButtonClick = async () => {
        if (props.hide) return
        if (theme_confirmed) return
        try {
            const response = await fetch((process.env.REACT_APP_BACKEND_URL?.toString() ?? "") + "/theme", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(changeThemeB(data.theme))
                console.log(data);
            } else {
                console.log(await response.json());
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="m-6">
            <div className="text-lg">お題</div>
            <p className="text-3xl font-bold">{props.hide || theme} <a onClick={GenerateButtonClick}>⚙</a></p>
            <div className="text-lg">を当ててもらおう</div>
        </div>
    );
}

export default TopicGenerationButton;