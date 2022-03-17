import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DirectMessageType, MessageType } from '@app/types/message';
import { User } from '@app/types/user';

export interface ChatState {
  messages: Array<MessageType>;
  activeConversation?: User;
  directChatHistory: { [key: string]: Array<DirectMessageType> };
  socketId?: string;
}

const initialState: ChatState = {
  messages: [],
  directChatHistory: {},
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
    appendDirectChatHisotry: (
      state,
      action: PayloadAction<DirectMessageType>
    ) => {
      const message = action.payload;

      const userSocketId = message.messageCreatedByMe
        ? message.receiverSocketId
        : message.authorSocketId;
      if (!userSocketId) {
        return;
      }

      const existingChatHistory = state.directChatHistory[userSocketId];
      const newChatHistory = existingChatHistory
        ? [...existingChatHistory, message]
        : [message];
      state.directChatHistory[userSocketId] = newChatHistory;
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
  appendDirectChatHisotry,
  setSocketId,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
