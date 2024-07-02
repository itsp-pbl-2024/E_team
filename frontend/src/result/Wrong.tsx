import React from 'react';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../app/store";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30vh',
    // backgroundColor: '#f0f0f0', // Optional background color for the screen
  },
  correctCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: 'red',
    color: 'white',
    fontSize: '100px',
  },
};

function Wrong () {
  const answer = useSelector((state: StateType) => state.history.value.currentGameStatus.answers).at(-1)
    return (
        <div>
            <div className="bg-gradient-to-r from-emerald-200 to-red-300 p-2">回答者→出題者</div>
            <div className='m-6'>
                <p className="text-3xl font-bold">残念！</p>
            </div>
            <div style={styles.container}>
                <div style={styles.correctCircle}>✖︎</div>
            </div>
            <div className='m-6'>
                <p>今回の解答</p>
                <p className="text-3xl font-bold">{answer}</p>
            </div>
            <Link to={"/to_questioner_transition_confirm"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    出題画面へ
                </button>
            </Link>
        </div>
    );
};

export default Wrong;