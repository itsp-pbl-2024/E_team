import '../App.css';
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
}

function Players() {
    const [username, setUsername] = useState<string>('');

    const dispatch = useDispatch()
    const userList: UserProperty[] = useSelector((state: StateType) => state.userList.value)

    const handleAddParticipant = () => {
        if (username.trim() !== '') {
            const newParticipant: UserProperty = { username, role: UserRole.Unassigned };

            dispatch(setUserList([...userList, newParticipant]))
            setUsername('');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const assignRole = () => {
        if (userList.length === 0) return;

        // 乱数で説明側のインデックスを決定
        const explanationIndex = Math.floor(Math.random() * userList.length);

        // 説明側と回答側を設定
        const updatedParticipants = userList.map((participant, index) => {
            if (index === explanationIndex) {
                return { ...participant, role: UserRole.Explanation };
            }
            return { ...participant, role: UserRole.Answer };
        });

        dispatch(setUserList(updatedParticipants))
    };

    return (
        <div>
            <h1 className='text-2xl'>プレイヤー名を入力してください</h1>
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    className='p-2'
                    placeholder="名前を入力してください"
                />
                <button onClick={handleAddParticipant}>
                    追加
                </button>
            </div>

            <div>
                <h2 className='text-xl'>参加者一覧</h2>

            </div>
            <div>
                <div className='grid grid-cols-4 gap-4'>
                    {userList.map((participant, index) => (
                        <div key={index} className={'p-4 rounded-md ' + ((participant.role == UserRole.Unassigned) ? "bg-gray-300" : participant.role == UserRole.Explanation ? "bg-red-100" : "bg-green-100")}  >
                            {participant.username} - {participant.role}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button onClick={assignRole} className='m-4'>
                    役割を決める
                </button>
                <Link to={"/questioner"}>
                    <button className='m-4'
                        disabled={userList.some(a => (a.role == UserRole.Unassigned)) || userList.length === 0}
                    >
                        確定する
                    </button>
                </Link>


            </div>
            <Routes>
                <Route path='/questioner' element={<ExplainBox />} />
            </Routes>
        </div>
    );
}

export default Players;
