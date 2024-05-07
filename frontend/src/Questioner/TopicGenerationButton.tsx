import { useState } from "react";
import './TopicGenerationButton.css'

function TopicGenerationButton(){
    const [topic,setTopic]=useState<string[]>(['東工大','因数分解','システム','コンセプト','世界遺産','有給休暇','アプリケーション','キャンプファイヤー']);
    const [randomIndex,setRandomIndex]=useState(0);

    const ButtonClick=()=>{
        setRandomIndex(Math.floor(Math.random()*topic.length));
    };

    return (
        <div>
            <button className="TopicGenerationButton" onClick={ButtonClick}>お題生成</button>
            <p className="topic">{topic[randomIndex]}</p>
        </div>
    );
}; 

export default TopicGenerationButton;