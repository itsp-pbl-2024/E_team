import {configureStore} from '@reduxjs/toolkit'
import ThemeReducer from "./redux/theme"
import SettingsReducer from "./redux/settings"
import UserListReducer from './redux/userList'

const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        settings: SettingsReducer,
        userList: UserListReducer
    }
})

export type StateType = ReturnType<typeof store.getState>

export default store

