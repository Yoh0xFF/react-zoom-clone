import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ConnectionState {
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
  roomId?: string;
  identity?: string;
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
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setIdentity: (state, action: PayloadAction<string>) => {
      state.identity = action.payload;
    },
  },
});

export const {
  setIsRoomHost,
  setConnectOnlyWithAudio,
  setRoomId,
  setIdentity,
} = connectionSlice.actions;

export const connectionReducer = connectionSlice.reducer;
