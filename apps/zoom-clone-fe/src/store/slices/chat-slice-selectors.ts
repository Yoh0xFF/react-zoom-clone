import { RootState } from '@app/store/store';

export const selectMessages = (state: RootState) => {
  return state.chat.messages;
};

export const selectActiveConversation = (state: RootState) => {
  return state.chat.activeConversation;
};

export const selectDirectChatHistory = (state: RootState) => {
  return state.chat.directChatHistory;
};

export const selectSocketId = (state: RootState) => {
  return state.chat.socketId;
};
