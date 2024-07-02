import { createSlice } from '@reduxjs/toolkit'

export type SettingsType = {
    censorType: CensorType,
    volume: number,
    difficulty: DifficultyType,
    language: LanguageType
}

export type CensorType = {
    label: string,
    path: string
}

export type DifficultyType = string
export type LanguageType = string

export const CensorTypes = {
    spacy: {
        label: "spaCy",
        path: "/censor"
    },
    chatgpt: {
        label: "ChatGPT",
        path: "/censor/chatgpt"
    }
}

export const DifficutyTypes = {
    normal: "普通",
    hard: "難しい"
}

export const LanguageTypes = {
    ja: "日本語",
    en: "English"
}

export const settingSlice = createSlice({
    name: 'settings',
    initialState: {
        value: {
            censorType: CensorTypes.spacy,
            volume: 50,
            difficulty: DifficutyTypes.normal,
            language: LanguageTypes.ja,
        } as SettingsType,
    },
    reducers: {
        setCensorType: (state, action) => {
            state.value.censorType = action.payload
        },
        setVolume: (state, action) => {
            state.value.volume = action.payload
        },
        setDifficulty: (state, action) => {
            state.value.difficulty = action.payload
        },
        setLanguage: (state, action) => {
            state.value.language = action.payload
        }
    }
})

export const { setCensorType, setVolume, setDifficulty, setLanguage } = settingSlice.actions

export default settingSlice.reducer