import Button from '@app/ui/join-room-page/components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './JoinRoomButtons.css';

export interface JoinRoomButtonsProps {
  isRoomHost: boolean;
  joinRoom: () => void;
}

export default function JoinRoomButtons(
  props: JoinRoomButtonsProps,
): JSX.Element {
  const navigate = useNavigate();
  const successButtonText = props.isRoomHost ? 'Host' : 'Join';

  const cancelButtonOnClickHandler = () => {
    navigate('/');
  };

  return (
    <div className='join_room_buttons_container'>
      <Button buttonText={successButtonText} onClick={props.joinRoom} />

      <Button
        buttonText='Cancel'
        cancelButton
        onClick={cancelButtonOnClickHandler}
      />
    </div>
  );
}
