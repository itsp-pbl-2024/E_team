import React from 'react';
import {Link} from "react-router-dom";

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
    return (
        <div>
            <div className='m-6'>
                <p className="text-3xl font-bold">残念！</p>
            </div>
            <div style={styles.container}>
                <div style={styles.correctCircle}>✖︎</div>
            </div>
            <div className='m-6'>
                <p>今回の解答</p>
                <p className="text-3xl font-bold">東京工業大学</p>
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