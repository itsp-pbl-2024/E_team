import {configureStore} from '@reduxjs/toolkit'
import ThemeReducer from "./redux/theme"
import userListReducer from './redux/theme'

const store = configureStore({
    reducer: {
        theme: ThemeReducer,
        userList: userListReducer
    }
})

export type StateType = ReturnType<typeof store.getState>

export default store

