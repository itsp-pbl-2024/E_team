import '../App.css';
import { useNavigate } from "react-router-dom";

// TypeScriptでのCSSプロパティの型をインポート
import { CSSProperties } from 'react';

function HowTo() {
    const navigate=useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    const steps = [
        "プレイヤー名を入力->「Add」ボタンで登録し, 「Randomize」->「Confirm」で役職を決める",
        "出題者は「お題生成」ボタンを押してお題を確認する",
        "出題者はお題を伝えるための説明文を入力する",
        "「確定する」ボタンを押して回答者へデバイスを渡す",
        "デバイスを受け取った回答者は検閲された説明文からお題を話し合い推測する",
        "回答を入力し, 「確定する」ボタンで正誤判定を行う",
        "正解であればゲームクリア、不正解であれば「出題者へ」ボタンを押し, 正解するまで3. から7.を繰り返す",
    ];

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>ゲームの遊び方</h1>
            <ol style={listStyle}>
                {steps.map((step, index) => (
                    <li key={index} style={listItemStyle}>{step}</li>
                ))}
            </ol>
            <button onClick={handleClose}>閉じる</button>
        </div>
    );
}
// スタイルオブジェクトをCSSProperties型で定義
const containerStyle: CSSProperties = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const headingStyle: CSSProperties = {
    textAlign: 'center',
    color: '#333',
};

const listStyle: CSSProperties = {
    listStyleType: 'decimal',
    padding: '0 20px',
};

const listItemStyle: CSSProperties = {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#555',
};

export default HowTo;
