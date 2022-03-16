import React from 'react';

import './Participant.css';

import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { setActiveConversation } from '@app/store/slices/chat-slice';
import { selectSocketId } from '@app/store/slices/chat-slice-selectors';
import { User } from '@app/types/user';

export interface ParticipantProps {
  participant: User;
  lastItem: boolean;
}

export default function Participant(props: ParticipantProps): JSX.Element {
  const dispatch = useAppDispatch();
  const socketId = useAppSelector(selectSocketId);

  const openActiveChatboxeHandler = () => {
    if (props.participant.socketId !== socketId) {
      dispatch(setActiveConversation(props.participant));
    }
  };

  return (
    <>
      <p className='participants_paragraph' onClick={openActiveChatboxeHandler}>
        {props.participant.identity}
      </p>
      {!props.lastItem && <span className='participants_separator_line' />}
    </>
  );
}
