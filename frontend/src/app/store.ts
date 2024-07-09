import {configureStore} from '@reduxjs/toolkit'
import SettingsReducer from "./redux/settings"
import UserListReducer from './redux/userList'
import HistoryReducer from './redux/history'
import ModeReducer from './redux/mode'

const store = configureStore({
    reducer: {
        settings: SettingsReducer,
        userList: UserListReducer,
        history: HistoryReducer,
        mode: ModeReducer
    }
})

export type StateType = ReturnType<typeof store.getState>

export default store

