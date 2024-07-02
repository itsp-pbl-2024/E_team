import {createSlice} from '@reduxjs/toolkit'

export type CurrentGame = {
    theme: string,
    theme_confirmed: boolean,
    tmp_explanation: string,

    explanations: string[],
    censored_explanations: string[],
    answers: string[],
}

export type ThemeHistory = {
    theme: string,
    explanations: string[],
    censored_explanations: string[],
    answers: string[],
}

export type HistoryType = {
    currentGameStatus: CurrentGame,
    themeHistories: ThemeHistory[],
}

const initialGame = {
    theme: "",
    theme_confirmed: false,
    tmp_explanation: "",
    explanations: [],
    censored_explanations: [],
    answers: [],
} as CurrentGame

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        value: {
            currentGameStatus: initialGame,
            themeHistories: [] as CurrentGame[],
        } as HistoryType
    },
    reducers: {
        changeTheme: (state, action) => {
            state.value.currentGameStatus.theme = action.payload
            state.value.currentGameStatus.theme_confirmed = false
        },
        confirmTheme: (state) => {
            state.value.currentGameStatus.theme_confirmed = true
        },
        confirmExplanation: (state) => {
            state.value.currentGameStatus.explanations = [...state.value.currentGameStatus.explanations, state.value.currentGameStatus.tmp_explanation]
            state.value.currentGameStatus.tmp_explanation = ""
        },
        updateExplanation: (state, action) => {
            state.value.currentGameStatus.tmp_explanation = action.payload
        },
        appendCensoredExplanation: (state, action) => {
            state.value.currentGameStatus.censored_explanations = [...state.value.currentGameStatus.censored_explanations, action.payload]
        },
        appendAnswer: (state, action) => {
            state.value.currentGameStatus.answers = [...state.value.currentGameStatus.answers, action.payload]
        },
        finishCurrentGame: (state) => {
            state.value.themeHistories = [...state.value.themeHistories, state.value.currentGameStatus as ThemeHistory]
        },
        resetCurrentGame: (state) => {
            state.value.currentGameStatus = initialGame
        }
    }
})

export const {
    changeTheme,
    confirmTheme,
    confirmExplanation,
    updateExplanation,
    appendCensoredExplanation,
    appendAnswer,
    finishCurrentGame,
    resetCurrentGame,
} = historySlice.actions

export default historySlice.reducer