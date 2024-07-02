import {configureStore} from '@reduxjs/toolkit'
import SettingsReducer from "./redux/settings"
import UserListReducer from './redux/userList'
import HistoryReducer from './redux/history'

const store = configureStore({
    reducer: {
        settings: SettingsReducer,
        userList: UserListReducer,
        history: HistoryReducer,
    }
})

export type StateType = ReturnType<typeof store.getState>

export default store

