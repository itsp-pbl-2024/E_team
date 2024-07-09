import '../App.css';
import './players.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "../app/redux/userList";
import store, { StateType } from "../app/store";


import './players.css'
import ExplainBox from '../questioner/ExplainBox';
/**
 * ユーザーの役割の列挙型
 */
export enum UserRole {
    Unassigned = "未決定",
    Explanation = "出題側",
    Answer = "回答側"
}

/**
 * ユーザ情報を表す型
 */
export type UserProperty = {
    username: string;
    role: UserRole;
    team: number;
}

function shuffle(array: number[]) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

function Players() {
    useEffect(() => {
        resetRole();
      }, []);
    const [username, setUsername] = useState<string>('');

    const dispatch = useDispatch()
    const userList: UserProperty[] = useSelector((state: StateType) => state.userList.value)

    const gameMode = useSelector((state: StateType) => state.mode.mode)

    const handleAddParticipant = () => {
        if (username.trim() !== '') {
            const newParticipant: UserProperty = { username, role: UserRole.Unassigned, team: 1 };

            dispatch(setUserList([...userList, newParticipant]))
            setUsername('');
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const resetRole = () => {
        const updatedParticipants = userList.map((participant, index) => {
            return { ...participant, role: UserRole.Unassigned };
        });
        dispatch(setUserList(updatedParticipants))
    };

    const assignRole = () => {
        if (userList.length === 0) return;

        if (gameMode === 'single') {
            // 乱数で説明側のインデックスを決定
            const explanationIndex = Math.floor(Math.random() * userList.length);
    
            // 説明側と回答側を設定
            const updatedParticipants = userList.map((participant, index) => {
                if (index === explanationIndex) {
                    return { ...participant, role: UserRole.Explanation, team: 1 };
                }
                return { ...participant, role: UserRole.Answer, team: 1 };
            });
            dispatch(setUserList(updatedParticipants))
        } else {
            const indices  = Array(userList.length).fill(0).map((e,i) => e+i);
            shuffle(indices);
            const teamSize = indices.length / 2 | 0;
            const head1 = 0;
            const head2 = teamSize;

            const updatedUserList = userList.map((user, i) => {
                const index = indices[i];
                const newUser = { ...user };
                
                if (index < teamSize) {
                    newUser.team = 1;
                    if (index === head1) {
                        newUser.role = UserRole.Explanation;
                    } else {
                        newUser.role = UserRole.Answer;
                    }
                } else {
                    newUser.team = 2;
                    if (index === head2) {
                        newUser.role = UserRole.Explanation;
                    } else {
                        newUser.role = UserRole.Answer;
                    }
                }
                
                return newUser;
            });
            dispatch(setUserList(updatedUserList))
        }
        

    };


    return (
        <div>
            <h1 className='text-2xl m-4'>プレイヤー名を入力してください</h1>
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    className='p-2'
                    placeholder="名前を入力してください"
                />
                <button onClick={handleAddParticipant} disabled={!username}>
                    追加
                </button>
            </div>


            <div>
                <h2 className='text-xl'>参加者一覧</h2>

            </div >
            <div>
                <div className='grid grid-cols-4 gap-4'>
                    {userList.map((participant, index) =>
                        <div key={index} className={'p-4 rounded-md ' + 
                            ((participant.role == UserRole.Unassigned)
                            ? "bg-gray-300" 
                            : (participant.role == UserRole.Explanation
                                ? ((participant.team == 1) ? "bg-green-500" : "bg-red-500")
                                : ((participant.team == 1) ? "bg-green-100" : "bg-red-100" )))}>
                            {participant.username} - {participant.role}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <button onClick={assignRole} className='m-4' disabled={userList.length === 0}>
                    役割を決める
                </button>
                <Link to={gameMode == 'single' ? "/questioner" : "/2team/questioner"}>
                    <button className='m-4'
                        disabled={userList.some(a => (a.role == UserRole.Unassigned)) || userList.length < 2}
                    >
                        確定する
                    </button>
                </Link>


            </div>
        </div >
    );
}

export default Players;
