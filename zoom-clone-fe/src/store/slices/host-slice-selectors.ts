import { RootState } from '@app/store/store';

export const selectIsRoomHost = (state: RootState) => state.host.isRoomHost;
