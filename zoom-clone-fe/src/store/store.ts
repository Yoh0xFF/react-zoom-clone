import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { chatReducer } from './slices/chat-slice';

import { connectionReducer } from '@app/store/slices/connection-slice';

export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    chat: chatReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
