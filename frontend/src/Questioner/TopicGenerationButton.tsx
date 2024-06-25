import './TopicGenerationButton.css'
import {useDispatch, useSelector} from "react-redux";
import ThemeReducer, {setTheme} from "../app/redux/theme";
import store, {StateType} from "../app/store";

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
        <div>
            <button className="TopicGenerationButton" onClick={GenerateButtonClick} disabled={theme != ""}>お題生成
            </button>
            <button className="TopicGenerationButton" onClick={GenerateButtonClick} disabled={theme == ""}>再生成
            </button>
            <p className="topic">{theme}</p>
        </div>
    );
}

export default TopicGenerationButton;