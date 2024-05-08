import React from 'react';

import './JoinRoomTitle.css';

export interface JoinRoomTitleProps {
  isRoomHost: boolean;
}

export default function JoinRoomTitle(props: JoinRoomTitleProps): JSX.Element {
  const titleText = props.isRoomHost ? 'Host meeting' : 'Join meeting';

  return <p className='join_room_title'>{titleText}</p>;
}
