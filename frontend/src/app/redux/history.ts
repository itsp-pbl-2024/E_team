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
    currentGameStatusA: CurrentGame,
    currentGameStatusB: CurrentGame,
    themeHistories: ThemeHistory[][],
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
            currentGameStatusA: initialGame,
            currentGameStatusB: initialGame,
            themeHistories: [] as CurrentGame[][],
        } as HistoryType
    },
    reducers: {
        changeThemeA: (state, action) => {
            state.value.currentGameStatusA.theme = action.payload
            state.value.currentGameStatusA.theme_confirmed = false
        },
        confirmThemeA: (state) => {
            state.value.currentGameStatusA.theme_confirmed = true
        },
        confirmExplanationA: (state) => {
            state.value.currentGameStatusA.explanations = [...state.value.currentGameStatusA.explanations, state.value.currentGameStatusA.tmp_explanation]
            state.value.currentGameStatusA.tmp_explanation = ""
        },
        updateExplanationA: (state, action) => {
            state.value.currentGameStatusA.tmp_explanation = action.payload
        },
        appendCensoredExplanationA: (state, action) => {
            state.value.currentGameStatusA.censored_explanations = [...state.value.currentGameStatusA.censored_explanations, action.payload]
        },
        appendAnswerA: (state, action) => {
            state.value.currentGameStatusA.answers = [...state.value.currentGameStatusA.answers, action.payload]
        },
        changeThemeB: (state, action) => {
            state.value.currentGameStatusB.theme = action.payload
            state.value.currentGameStatusB.theme_confirmed = false
        },
        confirmThemeB: (state) => {
            state.value.currentGameStatusB.theme_confirmed = true
        },
        confirmExplanationB: (state) => {
            state.value.currentGameStatusB.explanations = [...state.value.currentGameStatusB.explanations, state.value.currentGameStatusB.tmp_explanation]
            state.value.currentGameStatusB.tmp_explanation = ""
        },
        updateExplanationB: (state, action) => {
            state.value.currentGameStatusB.tmp_explanation = action.payload
        },
        appendCensoredExplanationB: (state, action) => {
            state.value.currentGameStatusB.censored_explanations = [...state.value.currentGameStatusB.censored_explanations, action.payload]
        },
        appendAnswerB: (state, action) => {
            state.value.currentGameStatusB.answers = [...state.value.currentGameStatusB.answers, action.payload]
        },
        finishCurrentGame: (state) => {
            state.value.themeHistories = [...state.value.themeHistories, [state.value.currentGameStatusA, state.value.currentGameStatusB] as ThemeHistory[]]
        },
        resetCurrentGame: (state) => {
            state.value.currentGameStatusA = initialGame
            state.value.currentGameStatusB = initialGame
        }
    }
})

export const {
    changeThemeA,
    confirmThemeA,
    confirmExplanationA,
    updateExplanationA,
    appendCensoredExplanationA,
    appendAnswerA,
    changeThemeB,
    confirmThemeB,
    confirmExplanationB,
    updateExplanationB,
    appendCensoredExplanationB,
    appendAnswerB,
    finishCurrentGame,
    resetCurrentGame,
} = historySlice.actions

export default historySlice.reducer