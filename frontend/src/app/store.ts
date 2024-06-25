import {configureStore} from '@reduxjs/toolkit'
import ThemeReducer from "./redux/theme"
import CensorTypeReducer from "./redux/censorType"

const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        censorType: CensorTypeReducer,
    }
})

export type StateType = ReturnType<typeof store.getState>

export default store

