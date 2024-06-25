import {configureStore} from '@reduxjs/toolkit'
import ThemeReducer from "./redux/theme"
import UserListReducer from './redux/userList'

const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        userList: UserListReducer
    }
})

export type StateType = ReturnType<typeof store.getState>

export default store

