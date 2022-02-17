import React from 'react';

import './ConnectingButton.css';

export interface ConnectingButtonProps {
  createRoomButton?: boolean;
  buttonText: string;
  onClick: () => void;
}

export default function ConnectingButton(
  props: ConnectingButtonProps
): JSX.Element {
  const { createRoomButton, buttonText, onClick } = props;

  const buttonClass = createRoomButton
    ? 'create_room_button'
    : 'join_room_button';

  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
}
