import React from 'react';

import './Participants.css';

import Participant from '@app/ui/room-page/components/participants-section/components/Participant';

const participants = [
  { identity: 'Ada Lovelace' },
  { identity: 'Alan Turing' },
  { identity: 'Dennis Ritchie' },
  { identity: 'Brian Kernighan' },
];

export interface ParticipantsProps {}

export default function Participants(props: ParticipantsProps): JSX.Element {
  return (
    <div className='participants_container'>
      {participants.map((x, i) => {
        return (
          <Participant
            key={x.identity}
            identity={x.identity}
            lastItem={participants.length === i + 1}
          />
        );
      })}
    </div>
  );
}
