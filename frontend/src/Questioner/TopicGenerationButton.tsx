import { useState } from "react";
import './TopicGenerationButton.css'
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../app/redux/theme";
import { StateType } from "../app/store";

function TopicGenerationButton() {
    const dispatch = useDispatch()
    const theme = useSelector((state: StateType) => state.theme.value)
    const GenerateButtonClick = async () => {
        try {
            const response = await fetch((process.env.REACT_APP_BACKEND_URL?.toString() ?? "") + "/theme", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(setTheme(data.theme))
                console.log(data);
            } else {
                const errorData = await response.json();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="m-6">
            <div className="text-lg">お題</div>
            <p className="text-3xl font-bold">{theme}  <a onClick={() => GenerateButtonClick()}>⚙</a> </p>
            <div className="text-lg">を当ててもらおう</div>
        </div>
    );
}

export default TopicGenerationButton;