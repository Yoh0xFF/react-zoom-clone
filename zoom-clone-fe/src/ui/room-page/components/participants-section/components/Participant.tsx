import React from 'react';

import './Participant.css';

export interface ParticipantProps {
  identity: string;
  lastItem: boolean;
}

export default function Participant(props: ParticipantProps): JSX.Element {
  return (
    <>
      <p className='participants_paragraph'>{props.identity}</p>
      {!props.lastItem && <span className='participants_separator_line' />}
    </>
  );
}
