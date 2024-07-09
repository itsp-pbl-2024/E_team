import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface ModeState {
  mode: 'single' | 'double';
}

// Define the initial state using that type
const initialState: ModeState = {
  mode: 'single',
};

// Create a slice of the state
const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setSingleMode: (state) => {
      state.mode = 'single';
    },
    setDoubleMode: (state) => {
      state.mode = 'double';
    },
    setMode: (state, action: PayloadAction<'single' | 'double'>) => {
      state.mode = action.payload;
    },
  },
});

export const { setSingleMode, setDoubleMode, setMode } = modeSlice.actions;

export default modeSlice.reducer;
