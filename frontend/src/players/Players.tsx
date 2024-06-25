import '../App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExplainBox from '../questioner/ExplainBox';
import React, {useState} from 'react';
/**
 * ユーザーの役割の列挙型
 */
enum UserRole {
    Unassigned = "未決定",
    Explanation = "説明側",
    Answer = "回答側"
}

/**
 * ユーザ情報を表す型
 */
interface UserPropaty {
    username: string;
    role: UserRole;
}

function Players() {
    const [username, setUsername] = useState<string>('');
    const [participants, setParticipants] = useState<UserPropaty[]>([]);
  
    const handleAddParticipant = () => {
      if (username.trim() !== '') {
        const newParticipant: UserPropaty = { username, role: UserRole.Unassigned };
        setParticipants([...participants, newParticipant]);
        setUsername('');
      }
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };

    const assignRole = () => {
        if (participants.length === 0) return;

        // 乱数で説明側のインデックスを決定
        const explanationIndex = Math.floor(Math.random() * participants.length);

        // 説明側と回答側を設定
        const updatedParticipants = participants.map((participant, index) => {
            if (index === explanationIndex) {
                return { ...participant, role: UserRole.Explanation };
            }
            return { ...participant, role: UserRole.Answer };
        });

        setParticipants(updatedParticipants);
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
                <button onClick={handleAddParticipant} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    追加
                </button>
            </div>
            
            <div>
            <h2>参加者一覧</h2>
                <ul>
                    {participants.map((participant, index) => (
                        <li key={index}>
                            {participant.username} - {participant.role}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={assignRole} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                役割を決める
            </button>
            <Link to={"/questioner"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    確定する
                </button>
            </Link>
            <Routes>
                <Route path='/questioner' element={<ExplainBox/>}/>
            </Routes>
        </div>
    );
}
  
export default Players;
