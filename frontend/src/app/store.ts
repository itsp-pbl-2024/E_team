import {configureStore} from '@reduxjs/toolkit'
import ThemeReducer from "./redux/theme"
import SettingsReducer from "./redux/settings"

const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        settings: SettingsReducer,
    }
})

export type StateType = ReturnType<typeof store.getState>

export default store

