import {createSlice} from '@reduxjs/toolkit'

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

export const censorTypeSlice = createSlice({
    name: 'censorType',
    initialState: {
        value: {
            label: "spaCy",
            path: "/censor"
        },
    },
    reducers: {
        setCensorType: (state, action) => {
            state.value = action.payload
        },
    }
})

export const {setCensorType} = censorTypeSlice.actions

export default censorTypeSlice.reducer