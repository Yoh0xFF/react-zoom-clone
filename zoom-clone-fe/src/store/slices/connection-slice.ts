import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ConnectionState {
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
}

const initialState: ConnectionState = {
  isRoomHost: false,
  connectOnlyWithAudio: false,
};

export const connectionSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    setIsRoomHost: (state, action: PayloadAction<boolean>) => {
      state.isRoomHost = action.payload;
    },
    setConnectOnlyWithAudio: (state, action: PayloadAction<boolean>) => {
      state.connectOnlyWithAudio = action.payload;
    },
  },
});

export const { setIsRoomHost, setConnectOnlyWithAudio } =
  connectionSlice.actions;

export const connectionReducer = connectionSlice.reducer;
