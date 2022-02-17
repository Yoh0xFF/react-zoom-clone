import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface HostState {
  isRoomHost: boolean;
}

const initialState: HostState = {
  isRoomHost: false,
};

export const hostSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    setIsRoomHost: (state, action: PayloadAction<boolean>) => {
      state.isRoomHost = action.payload;
    },
  },
});

export const { setIsRoomHost } = hostSlice.actions;

export const hostReducer = hostSlice.reducer;
