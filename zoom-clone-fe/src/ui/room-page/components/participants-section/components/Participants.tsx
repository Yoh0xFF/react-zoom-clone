import React from 'react';

import './Participants.css';

import { User } from '@app/types/user';
import Participant from '@app/ui/room-page/components/participants-section/components/Participant';

export interface ParticipantsProps {
  participants: Array<User>;
}

export default function Participants(props: ParticipantsProps): JSX.Element {
  return (
    <div className='participants_container'>
      {props.participants.map((x, i) => {
        return (
          <Participant
            key={x.identity}
            identity={x.identity}
            lastItem={props.participants.length === i + 1}
          />
        );
      })}
    </div>
  );
}
