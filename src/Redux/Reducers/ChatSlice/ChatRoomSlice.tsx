import { AllMemberType, ChatSliceType, ChatsTypes, MessageType,  } from "@/Types/ChatType";
import { createAsyncThunk, createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import axios from "axios";
import {UserType} from "@/Types/Users/UsersType";

const initialState:ChatSliceType = {

    usersJoined: [],
    messages: [],
};


const ChatSlice = createSlice({
    name: "Chat",
    initialState,
    reducers: {

        setMessage : (state, action: PayloadAction<MessageType[]>) => {
            state.messages= action.payload;
        },
        setUsersJoined : (state, action : PayloadAction<UserType>) => {
            const userExists = state.usersJoined.some(user => user.id === action.payload.id);
            if (!userExists) {
                state.usersJoined.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        
    },
});

export const { setMessage, setUsersJoined } = ChatSlice.actions;

export default ChatSlice.reducer;