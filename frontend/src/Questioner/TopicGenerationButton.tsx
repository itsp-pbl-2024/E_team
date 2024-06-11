import { useState } from "react";
import './TopicGenerationButton.css'
import { useDispatch, useSelector } from "react-redux";
import ThemeReducer, { setTheme } from "../app/redux/theme";
import store, { StateType } from "../app/store";

function TopicGenerationButton() {
    const [topic, setTopic] = useState<string[]>(['東工大', '因数分解', 'システム', 'コンセプト', '世界遺産', '有給休暇', 'アプリケーション', 'キャンプファイヤー']);

    const dispatch = useDispatch()
    const theme = useSelector((state: StateType) => state.theme.value)
    const GenerateButtonClick = () => {
        if (theme == "") {
            const theme = topic[Math.floor(Math.random() * topic.length)]
            dispatch(setTheme(theme))
        }
    };
    const ReGennerateButtonClick = () => {
        const theme = topic[Math.floor(Math.random() * topic.length)]
        dispatch(setTheme(theme))

    }

    return (
        <div>
            <button className="TopicGenerationButton" onClick={GenerateButtonClick} disabled={theme != ""}>お題生成</button>
            <button className="TopicGenerationButton" onClick={ReGennerateButtonClick} disabled={theme == ""}>再生成</button>
            <p className="topic">{theme}</p>
        </div>
    );
};

export default TopicGenerationButton;