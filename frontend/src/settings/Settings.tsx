import React, { useEffect, useState } from "react";
import SwitchCensorButton from "./SwitchCensorButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store, { StateType } from "../app/store";


import { CensorTypes, LanguageTypes, DifficutyTypes, setCensorType, setVolume, setLanguage, setDifficulty } from "../app/redux/settings";

function Settings() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cencerType = useSelector((state: StateType) => state.settings.value)

    const handleClose = () => {
        navigate(-1)
    }
    const volumeHandle = (e: any) => {
        dispatch(setVolume(e.target.value))
    }

    const resetSetings = () => {
        dispatch(setCensorType(CensorTypes.spacy))
        dispatch(setVolume(50))
        dispatch(setDifficulty(DifficutyTypes.normal))
        dispatch(setLanguage(LanguageTypes.ja))

    }

    const cencerTypeHandler = (e: any) => {
        if (e.target.value == "ChatGPT") {
            dispatch(setCensorType(CensorTypes.chatgpt))
        }
        else {
            dispatch(setCensorType(CensorTypes.spacy))
        }
    }

    const DifficultyTypeHandler = (e: any) => {
        if (e.target.value == "普通") {
            dispatch(setDifficulty(DifficutyTypes.normal))
        }
        else {
            dispatch(setDifficulty(DifficutyTypes.hard))
        }
    }

    const LanguageTypeHandler = (e: any) => {
        if (e.target.value == "日本語") {
            dispatch(setLanguage(LanguageTypes.ja))
        }
        else {
            dispatch(setLanguage(LanguageTypes.en))
        }
    }



    return (
        <div>
            <h1 className="text-center text-2xl font-bold ">設定</h1>

            <div className="flex bg-gray-200 items-center m-2 h-16">
                <div className="w-3/4">
                    <label className="block text-gray-700">検閲方法</label>
                </div>
                <div className="w-1/4">
                    <select className="border rounded p-2 w-3/4" onChange={cencerTypeHandler} value={cencerType.censorType.label}>
                        <option value="ChatGPT">ChatGPT</option>
                        <option value="spaCy">spaCy</option>
                    </select>
                </div>
            </div>

            <div className="flex bg-gray-200 items-center m-2 h-16">
                <div className="w-3/4">
                    <label className="block text-gray-700">音量</label>
                </div>
                <div className="w-1/4">
                    <input type="range" className="w-3/4" value={cencerType.volume} onChange={volumeHandle} />
                </div>
            </div>

            <div className="flex bg-gray-200 items-center m-2 h-16">
                <div className="w-3/4">
                    <label className="block text-gray-700">言語</label>
                </div>
                <div className="w-1/4">
                    <select className="border rounded p-2 w-3/4" value={cencerType.language} onChange={LanguageTypeHandler}>
                        <option value="日本語">日本語</option>
                        <option value="English">English</option>
                    </select>
                </div>
            </div >

            <div className="flex bg-gray-200 items-center m-2 h-16 ">
                <div className="w-3/4">
                    <label className="block text-gray-700">難易度</label>
                </div>
                <div className="w-1/4">
                    <select className="border rounded p-2 w-3/4" value={cencerType.difficulty} onChange={DifficultyTypeHandler}>
                        <option value="普通">普通</option>
                        <option value="難しい">難しい</option>
                    </select>
                </div>

            </div >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded" onClick={handleClose}>閉じる</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded" onClick={resetSetings}>初期値に戻す</button>

        </div >
    );
}

export default Settings;
