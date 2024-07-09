import React from 'react';
import {Link} from "react-router-dom";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    // backgroundColor: '#f0f0f0', // Optional background color for the screen
  },
  correctCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: 'green',
    color: 'white',
    fontSize: '100px',
  },
};

function Correct () {
    return (
        <div>
            <div style={styles.container}>
                <div style={styles.correctCircle}>✔︎</div>
            </div>
            <Link to={"/"}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    トップへ
                </button>
            </Link>
        </div>
    );
};

export default Correct;