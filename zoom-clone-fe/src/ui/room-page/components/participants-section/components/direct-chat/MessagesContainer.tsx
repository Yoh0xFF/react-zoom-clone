import React from 'react';

import './MessagesContainer.css';
import SingleMessage from './SingleMessage';

import { MessageType } from '@app/types/message';

export interface MessagesContainerProps {
  messages: Array<MessageType>;
}

export default function MessagesContainer(
  props: MessagesContainerProps
): JSX.Element {
  return (
    <div className='direct_messages_container'>
      {props.messages.map((x) => {
        return <SingleMessage key={`${x.content}-${x.identity}`} message={x} />;
      })}
    </div>
  );
}
