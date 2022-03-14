import { RootState } from '@app/store/store';

export const selectMessages = (state: RootState) => {
  return state.chat.messages;
};
