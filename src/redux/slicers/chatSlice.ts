'use client';

import {saveToLocalStorage,getFromLocalStorage} from "@/utils/LocalStorage";
import {createSlice} from "@reduxjs/toolkit";

type State = {
  isJoinOpen: boolean;
  isCreateOpen: boolean;
  isEnterChatOpen: boolean;
  roomCode: string|null;
  roomName : string|null;
  members: any;
  roomAdmin: any;
  user:any|null;
  chats: any[];
}

const initialState: State = {
  isJoinOpen: false,
  isCreateOpen: false,
  isEnterChatOpen: false,
  roomName: null,
  members: null,
  roomAdmin: null,
  roomCode:getFromLocalStorage("roomCode"),
  user:getFromLocalStorage("user"),
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
   setIsJoinOpen: (state) => { 
    state.isJoinOpen =!state.isJoinOpen
   },
   setIsEnterChatOpen: (state) => {
    state.isEnterChatOpen = !state.isEnterChatOpen
   },
   setIsCreateOpen: (state) => {
    state.isCreateOpen = !state.isCreateOpen 
  },
  setMembers: (state, action) => {
    state.members = action.payload
  },
  setRoomAdmin: (state, action) => {
    state.roomAdmin = action.payload
  },
  setRoomCode: (state, action) => {
    state.roomCode = action.payload;
    saveToLocalStorage("roomCode", action.payload)
  },
  setRoomName: (state, action) => {
    state.roomName = action.payload
  },
  setUser: (state, action) => {
    state.user = action.payload
    saveToLocalStorage("user", action.payload)
  },
  setRoomCodeInConversations: (state, action) => {

    state.user.conversations= [...state.user.conversations,action.payload]
  },
  
  setChats: (state, action) => {
    state.chats = action.payload
  }
}
})


export const {
  setIsJoinOpen,
  setIsCreateOpen,
  setIsEnterChatOpen,
  setMembers,
  setRoomAdmin,
  setRoomName,
  setRoomCode,
  setUser,
  setRoomCodeInConversations,
  setChats

}= chatSlice.actions


export default chatSlice.reducer
