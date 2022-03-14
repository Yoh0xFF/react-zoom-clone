import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MessageType } from '@app/types/message';

export interface ChatState {
  messages: Array<MessageType>;
}

const initialState: ChatState = {
  messages: [],
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
  },
});

export const { setMessages, appendMessage } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
