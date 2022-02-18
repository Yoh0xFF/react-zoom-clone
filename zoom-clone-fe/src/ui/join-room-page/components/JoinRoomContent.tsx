import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './JoinRoomContent.css';

import { getRoomExists } from '@app/api/api';
import ErrorMessage from '@app/ui/join-room-page/components/ErrorMessage';
import JoinRoomButtons from '@app/ui/join-room-page/components/JoinRoomButtons';
import JoinRoomInputs from '@app/ui/join-room-page/components/JoinRoomInputs';
import OnlyWithAudioCheckbox from '@app/ui/join-room-page/components/OnlyWithAudioCheckbox';

export interface JoinRoomContentProps {
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
  setConnectOnlyWithAudio: (value: boolean) => void;
  setRoomId: (value: string) => void;
  setIdentity: (value: string) => void;
}

export default function JoinRoomContent(
  props: JoinRoomContentProps
): JSX.Element {
  const navigate = useNavigate();
  const [roomIdValue, setRoomIdValue] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const joinRoomHandler = async () => {
    props.setIdentity(nameValue);

    if (props.isRoomHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  const joinRoom = async () => {
    const { roomExists, full } = await getRoomExists(roomIdValue);

    if (roomExists) {
      if (full) {
        setErrorMessage('Meeting is full. Please try again later.');
      } else {
        props.setRoomId(roomIdValue);
        navigate('/room');
      }
    } else {
      setErrorMessage('Meeting not found. Check your meeting id.');
    }
  };

  const createRoom = () => {
    navigate('/room');
  };

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

      <ErrorMessage errorMessage={errorMessage} />

      <JoinRoomButtons
        isRoomHost={props.isRoomHost}
        joinRoom={joinRoomHandler}
      />
    </>
  );
}
