import { IceServer } from '@app/types/ice-server';

import { getTurnCredentials } from './api';

class TurnIceServersManager {
  private _iceServers: Array<IceServer> = [];

  async fetchTurnIceServers(): Promise<Array<IceServer>> {
    const data = await getTurnCredentials();

    if (data && data.token?.iceServers) {
      this._iceServers = data.token.iceServers;
    }

    return this._iceServers;
  }

  getTurnIceServers(): Array<IceServer> {
    return this._iceServers;
  }
}

export const turn = new TurnIceServersManager();
