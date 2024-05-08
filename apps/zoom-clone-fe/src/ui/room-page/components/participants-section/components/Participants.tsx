import { User } from '@app/types/user';
import Participant from '@app/ui/room-page/components/participants-section/components/Participant';
import React from 'react';

import './Participants.css';

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
            participant={x}
            lastItem={props.participants.length === i + 1}
          />
        );
      })}
    </div>
  );
}
