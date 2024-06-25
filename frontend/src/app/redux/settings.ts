import {createSlice} from '@reduxjs/toolkit'

export type SettingsType = {
    censorType: CensorType
}

export type CensorType = {
    label: string,
    path: string
}

export const CensorTypes = [
    {
        label: "spaCy",
        path: "/censor"
    },
    {
        label: "ChatGPT",
        path: "/censor/chatgpt"
    }
]

export const settingSlice = createSlice({
    name: 'settings',
    initialState: {
        value: {
            censorType:
                {
                    label: "spaCy",
                    path: "/censor"
                }
        } as SettingsType,
    },
    reducers: {
        setCensorType: (state, action) => {
            state.value.censorType = action.payload
        },
    }
})

export const {setCensorType} = settingSlice.actions

export default settingSlice.reducer