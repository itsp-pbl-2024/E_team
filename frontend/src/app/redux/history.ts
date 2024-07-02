import {createSlice} from '@reduxjs/toolkit'

export type CurrentTheme = {
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
    currentStatus: CurrentTheme,
    themeHistories: ThemeHistory[],
}

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        value: {
            currentStatus: {} as CurrentTheme,
            themeHistories: [] as CurrentTheme[],
        } as HistoryType
    },
    reducers: {
        changeTheme: (state, action) => {
            state.value.themeHistories = [...state.value.themeHistories, state.value.currentStatus as ThemeHistory]
            state.value.currentStatus = {
                theme: action.payload,
                theme_confirmed: false
            } as CurrentTheme
        },
        confirmTheme: (state) => {
            state.value.currentStatus.theme_confirmed = true
        },
        confirmExplanation: (state) => {
            state.value.currentStatus.explanations = [...state.value.currentStatus.explanations, state.value.currentStatus.tmp_explanation]
            state.value.currentStatus.tmp_explanation = ""
        },
        updateExplanation: (state, action) => {
            state.value.currentStatus.tmp_explanation = action.payload
        },
        appendCensoredExplanation: (state, action) => {
            state.value.currentStatus.censored_explanations = [...state.value.currentStatus.censored_explanations, action.payload]
        },
        appendAnswer: (state, action) => {
            state.value.currentStatus.answers = [...state.value.currentStatus.answers, action.payload]
        },
    }
})

export const {
    changeTheme,
    confirmTheme,
    confirmExplanation,
    updateExplanation,
    appendCensoredExplanation,
    appendAnswer
} = historySlice.actions

export default historySlice.reducer