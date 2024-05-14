import {configureStore} from '@reduxjs/toolkit'
import ThemeReducer from "../Questioner/theme"

const store = configureStore({
    reducer: {
        theme: ThemeReducer
    }
})

export type StateType = ReturnType<typeof store.getState>

export default store

