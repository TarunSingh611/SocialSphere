"use client";
import { createSlice} from "@reduxjs/toolkit";
type State = {
  user: any|null;
  modal: boolean|null;
};

const initialState: State = {
  user: null,
  modal: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload; 
        state.modal = false
    },
    clearUser: (state) => {
        state.user = null;
        state.modal = true
    },
    setAuthModal: (state, action) => {
        state.modal = action.payload;
    },
  },
});

export const {  setUser , clearUser, setAuthModal } = authSlice.actions;

export default authSlice.reducer;
