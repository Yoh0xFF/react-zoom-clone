import { RootState } from '@app/store/store';

export const selectIsRoomHost = (state: RootState) => {
  return state.connection.isRoomHost;
};

export const selectConnectOnlyWithAudio = (state: RootState) => {
  return state.connection.connectOnlyWithAudio;
};
