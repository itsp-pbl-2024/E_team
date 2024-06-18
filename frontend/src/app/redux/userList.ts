import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {UserRole, UserPropaty} from "../../top/Top"

const initList:UserPropaty[] = []

export const userListSlice = createSlice({
    name: 'userList',
    initialState: {
        value: "a"//initList
    },
    reducers: {
        //setUserList: (state, action: PayloadAction<UserPropaty[]>) => {
        setUserList: (state, action) => {
            console.log(action)
            //state.value = action.payload;
            state.value = "b";
        }
    }
});

// Action creators are generated for each case reducer function
export const {setUserList} = userListSlice.actions

export default userListSlice.reducer