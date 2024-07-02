import {createSlice} from '@reduxjs/toolkit'
import {UserProperty} from "../../players/Players"

export const userListSlice = createSlice({
    name: 'userList',
    initialState: {
        value: [] as UserProperty[]
    },
    reducers: {
        setUserList: (state, action) => {
            state.value = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const {setUserList} = userListSlice.actions

export default userListSlice.reducer