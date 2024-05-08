import { IceServer } from '@app/types/ice-server';
import axios from 'axios';

const serverApi = 'http://localhost:8080/api';

export async function getRoomExists(
  roomId: string,
): Promise<{ roomExists: boolean; full?: boolean }> {
  try {
    const response = await axios.get<{ roomExists: boolean; full?: boolean }>(
      `${serverApi}/room-exists/${roomId}`,
    );

    return response.data;
  } catch (error: any) {
    if (error.response.status === 404) {
      return { roomExists: false };
    } else {
      console.log('Api getRoomExists call failed', error);
    }
    throw error;
  }
}

export async function getTurnCredentials(): Promise<{
  token: { iceServers: Array<IceServer> };
}> {
  try {
    const response = await axios.get<{
      token: { iceServers: Array<IceServer> };
    }>(`${serverApi}/get-turn-credentials`);

    return response.data;
  } catch (error: any) {
    console.log('Api getTurnCredentials call failed', error);
    throw error;
  }
}
