import React, {useState, useContext} from 'react';
import {TextContext} from '../TextContext';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../app/store";
import {CensorType, CensorTypes, setCensorType} from "../app/redux/settings";

function SwitchButton() {
    const dispatch = useDispatch()
    const censorType: CensorType = useSelector((state: StateType) => state.settings.value.censorType)

    const handleSwitch = (ctype: CensorType) => {
        dispatch(setCensorType(ctype))
    };


    return (
        <div>
            <a>検閲官を選択 : </a>
            {
                CensorTypes.map((v) =>
                    <button key={v.label}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleSwitch(v)}>{v.label}
                    </button>
                )
            }
            <p>現在の検閲官 : {censorType.label}</p>
            <p>Current endpoint: {censorType.path}</p>
        </div>
    );
}

export default SwitchButton;
