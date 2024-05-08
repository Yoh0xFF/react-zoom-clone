import React from 'react';

import './Button.css';

export interface ButtonProps {
  buttonText: string;
  cancelButton?: boolean;
  onClick: () => void;
}

export default function Button(props: ButtonProps): JSX.Element {
  const buttonClassName = props.cancelButton
    ? 'join_room_cancel_button'
    : 'join_room_success_button';

  return (
    <button className={buttonClassName} onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
}
