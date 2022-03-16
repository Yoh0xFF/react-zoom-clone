import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MessageType } from '@app/types/message';
import { User } from '@app/types/user';

export interface ChatState {
  messages: Array<MessageType>;
  activeConversation?: User;
  directChatHistory: Array<MessageType>;
  socketId?: string;
}

const initialState: ChatState = {
  messages: [],
  directChatHistory: [],
};

export const chatSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Array<MessageType>>) => {
      state.messages = action.payload;
    },
    appendMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages = [...state.messages, action.payload];
    },
    setActiveConversation: (state, action: PayloadAction<User>) => {
      state.activeConversation = action.payload;
    },
    setDirectChatHistory: (
      state,
      action: PayloadAction<Array<MessageType>>
    ) => {
      state.directChatHistory = action.payload;
    },
    setSocketId: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload;
    },
  },
});

export const {
  setMessages,
  appendMessage,
  setActiveConversation,
  setDirectChatHistory,
  setSocketId,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
