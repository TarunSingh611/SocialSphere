'use client';
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import AuthSlicer from "./slicers/authSlice";
import NotificationSlicer from "./slicers/notificationSlice";
import ChatSlicer from "./slicers/chatSlice";

const rootReducer = combineReducers({
   auth: AuthSlicer,
   notifications:NotificationSlicer,
   chat: ChatSlicer,
})

export const store = configureStore({
    reducer: rootReducer
});
