import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {UserPropaty} from "../../top/Top"

interface UserState {
    value: UserPropaty[];
}

const initialState: UserState = {
    value: []
};

export const userListSlice = createSlice({
    name: 'userList',
    initialState,
    reducers: {
        setUserList: (state, action) => {
            return action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const {setUserList} = userListSlice.actions

export default userListSlice.reducer