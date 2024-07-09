import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateType} from "../../app/store";

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
        backgroundColor: 'green',
        color: 'white',
        fontSize: '100px',
    },
};

export function Correct(props: { wonTeam: string }) {
    const themeA = useSelector((state: StateType) => state.history.value.currentGameStatusA.theme)
    const themeB = useSelector((state: StateType) => state.history.value.currentGameStatusB.theme)

    return (
        <div>
            <div className='m-6'>
                <p className="text-3xl font-bold">{props.wonTeam}の勝ち！</p>
                <p className="text-3xl font-bold">おめでとう</p>
            </div>
            <div style={styles.container}>
                <div style={styles.correctCircle}>✔︎</div>
            </div>

            <div className="flex">
                <div className='m-6 flex-auto'>
                    <p>Aチームのお題</p>
                    <p className="text-3xl font-bold">{themeA}</p>
                </div>
                <div className='m-6 flex-auto'>
                    <p>Bチームのお題</p>
                    <p className="text-3xl font-bold">{themeB}</p>
                </div>
            </div>


            <Link to={"/"}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    トップへ
                </button>
            </Link>
        </div>
    );
}

export default Correct;