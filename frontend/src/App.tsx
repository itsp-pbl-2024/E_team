import {Link} from "react-router-dom";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import LinkButton from "./children/LinkButton";
import { useState } from "react";
import TopicGenerationButton from "./Questioner/TopicGenerationButton";

// function App() {
//   const title: string="Hello World!";
//   return (
//     <div className="App">
//       <h1>{title}</h1>
//       <LinkButton text='ボタン' link="/test" />
//     </div>
//   );
// } 

// export default App;


function App() {
  const title: string = "Hello World!";
  const [num, setNum] = useState(0);

  const increment = () => {
    setNum(num+1);
    console.log(num);
  };

  return (
    <div className="App">
      <h1>{title}</h1>
      {/* {num}回押しました。
      <LinkButton text="ボタン" link="/test" />
      <button type="button" onClick={increment}>増やす</button> */}
      <TopicGenerationButton />
    </div>
  );
}

export default App;
