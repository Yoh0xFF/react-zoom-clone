import React, { useState } from 'react';

import './JoinRoomContent.css';

import JoinRoomInputs from '@app/ui/join-room-page/components/JoinRoomInputs';
import OnlyWithAudioCheckbox from '@app/ui/join-room-page/components/OnlyWithAudioCheckbox';

export interface JoinRoomContentProps {
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
  setConnectOnlyWithAudio: (value: boolean) => void;
}

export default function JoinRoomContent(
  props: JoinRoomContentProps
): JSX.Element {
  const [roomIdValue, setRoomIdValue] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={(roomId) => setRoomIdValue(roomId)}
        nameValue={nameValue}
        setNameValue={(name) => setNameValue(name)}
        isRoomHost={props.isRoomHost}
      />

      <OnlyWithAudioCheckbox
        connectOnlyWithAudio={props.connectOnlyWithAudio}
        setConnectOnlyWithAudio={props.setConnectOnlyWithAudio}
      />
    </>
  );
}
