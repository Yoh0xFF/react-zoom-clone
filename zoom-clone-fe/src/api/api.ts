import axios from 'axios';

const serverApi = 'http://localhost:8080/api';

export async function getRoomExists(
  roomId: string
): Promise<{ roomExists: boolean; full?: boolean }> {
  try {
    const response = await axios.get<{ roomExists: boolean; full?: boolean }>(
      `${serverApi}/room-exists/${roomId}`
    );

    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return { roomExists: false };
    }
    throw error;
  }
}
