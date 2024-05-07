import { useState } from "react";

function TopicGenerationButton(){
    const [topic,setTopic]=useState<string[]>(['東工大','因数分解','システム']);
    const [randomIndex,setRandomIndex]=useState(0);
    const ButtonClick=()=>{
        setRandomIndex(Math.floor(Math.random()*topic.length));
        // alert(topic[randomIndex]);
    };

    return (
        <div>
            <button onClick={ButtonClick}>お題生成</button>
            <p>{topic[randomIndex]}</p>
        </div>
    );
};

export default TopicGenerationButton;