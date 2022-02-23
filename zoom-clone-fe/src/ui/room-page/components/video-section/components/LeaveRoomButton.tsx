import React from 'react';

import './LeaveRoomButton.css';

export interface LeaveRoomButtonProps {}

export default function LeaveRoomButton(
  props: LeaveRoomButtonProps
): JSX.Element {
  const roomDisconnectionHandler = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div className='video_button_container'>
      <button className='video_button_end' onClick={roomDisconnectionHandler}>
        Leave Room
      </button>
    </div>
  );
}
