import React from 'react';

import './RoomLabel.css';

export interface RoomLabelProps {
  roomId: string;
}

export default function RoomLabel(props: RoomLabelProps): JSX.Element {
  return (
    <div className='room_label'>
      <p className='room_label_paragraph'>ID: {props.roomId}</p>
    </div>
  );
}
