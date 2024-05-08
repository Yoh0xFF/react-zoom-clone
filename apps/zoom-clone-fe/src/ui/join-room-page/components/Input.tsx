import React, { ChangeEvent } from 'react';

import './Input.css';

export interface InputProps {
  placeholder: string;
  value?: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps): JSX.Element {
  return (
    <input
      className='join_room_input'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.changeHandler}
    />
  );
}
