import { connectionReducer } from '@app/store/slices/connection-slice';
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { chatReducer } from './slices/chat-slice';

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
