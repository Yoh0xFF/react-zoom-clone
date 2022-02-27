import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '@app/types/user';

export interface ConnectionState {
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
  roomId?: string;
  identity?: string;
  showOverlay: boolean;
  participants: Array<User>;
}

const initialState: ConnectionState = {
  isRoomHost: false,
  connectOnlyWithAudio: false,
  showOverlay: false,
  participants: [],
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
    setShowOverlay: (state, action: PayloadAction<boolean>) => {
      state.showOverlay = action.payload;
    },
    setParticipants: (state, action: PayloadAction<Array<User>>) => {
      state.participants = action.payload;
    },
  },
});

export const {
  setIsRoomHost,
  setConnectOnlyWithAudio,
  setRoomId,
  setIdentity,
  setShowOverlay,
  setParticipants,
} = connectionSlice.actions;

export const connectionReducer = connectionSlice.reducer;
