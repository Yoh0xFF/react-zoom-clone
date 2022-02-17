import React from 'react';
import { useNavigate } from 'react-router-dom';

import ConnectingButton from './ConnectingButton';
import './ConnectingButtons.css';

export default function ConnectingButtons(): JSX.Element {
  const navigate = useNavigate();

  const joinMeetingHandler = () => {
    navigate('/join-room');
  };
  const hostMeetingHandler = () => {
    navigate('/join-room?host=true ');
  };

  return (
    <div className='connecting_buttons_container'>
      <ConnectingButton
        buttonText='Join a meeting'
        onClick={joinMeetingHandler}
      />

      <ConnectingButton
        createRoomButton
        buttonText='Host a meeting'
        onClick={hostMeetingHandler}
      />
    </div>
  );
}
