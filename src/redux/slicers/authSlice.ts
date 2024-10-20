"use client";
import { createSlice} from "@reduxjs/toolkit";
type State = {
  user: any|null;
  userId: string|null;
  modal: boolean|null;
  profilePhoto : string;
  coverPhoto :string;
};

const initialState: State = {
  user: null,
  userId:null,
  modal: false,
  profilePhoto : null,
  coverPhoto : null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload; 
        state.modal = false
    },
    setUserId: (state, action) => {
      state.userId = action.payload; 
    },
    clearUser: (state) => {
        state.user = null;
        state.modal = true
    },
    setAuthModal: (state, action) => {
        state.modal = action.payload;
    },
    setProfilePhoto:(state, action)=>{
      console.log("redux",action.payload)
      state.profilePhoto = action.payload;
    }, 
    setCoverPhoto:(state, action) =>{
      state.coverPhoto = action.payload;
    }
  },
});

export const {  setUser, setUserId , clearUser, setAuthModal, setProfilePhoto, setCoverPhoto } = authSlice.actions;

export default authSlice.reducer;
