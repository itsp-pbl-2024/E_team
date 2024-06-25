import '../App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ExplainBox from '../Questioner/ExplainBox';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "../app/redux/userList";
import store, { StateType } from "../app/store";

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
            <h1>トップです</h1>
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={handleInputChange}
                    placeholder="名前を入力してください"
                />
                <button onClick={handleAddParticipant}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    追加
                </button>
            </div>

            <div>
                <h2>参加者一覧</h2>
                <ul>
                    {userList.map((participant, index) => (
                        <li key={index}>
                            {participant.username} - {participant.role}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={assignRole}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                役割を決める
            </button>
            <Link to={"/questioner"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    確定する
                </button>
            </Link>
            <Routes>
                <Route path='/questioner' element={<ExplainBox />} />
            </Routes>
        </div>
    );
}

export default Players;
