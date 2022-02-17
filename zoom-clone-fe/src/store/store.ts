import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { hostReducer } from '@app/store/slices/host-slice';

export const store = configureStore({
  reducer: {
    host: hostReducer,
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
