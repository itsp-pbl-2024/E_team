import {configureStore} from '@reduxjs/toolkit'
import ThemeReducer from "./redux/theme"

const store = configureStore({
    reducer: {
        theme: ThemeReducer
    }
})

export type StateType = ReturnType<typeof store.getState>

export default store

