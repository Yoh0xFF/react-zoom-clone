import React, { ChangeEvent } from 'react';

import './JoinRoomInputs.css';

import Input from '@app/ui/join-room-page/components/Input';

export interface JoinRoomInputsProps {
  roomIdValue: string;
  setRoomIdValue: (roomId: string) => void;
  nameValue: string;
  setNameValue: (name: string) => void;
  isRoomHost: boolean;
}

export default function JoinRoomInputs(
  props: JoinRoomInputsProps
): JSX.Element {
  const roomIdValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.setRoomIdValue(event.target.value);
  };

  const nameValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.setNameValue(event.target.value);
  };

  return (
    <div className='join_room_inputs_container'>
      {!props.isRoomHost && (
        <Input
          placeholder='Enter meeting ID'
          value={props.roomIdValue}
          changeHandler={roomIdValueChangeHandler}
        />
      )}

      <Input
        placeholder='Enter your Name'
        value={props.nameValue}
        changeHandler={nameValueChangeHandler}
      />
    </div>
  );
}
