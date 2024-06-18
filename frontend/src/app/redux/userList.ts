import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {UserRole, UserPropaty} from "../../top/Top"

const initList:UserPropaty[] = []

export const userListSlice = createSlice({
    name: 'userList',
    initialState: {
        value: initList
    },
    reducers: {
        setUserList: (state, action: PayloadAction<UserPropaty[]>) => {
            console.log(action)
            state.value = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const {setUserList} = userListSlice.actions

export default userListSlice.reducer