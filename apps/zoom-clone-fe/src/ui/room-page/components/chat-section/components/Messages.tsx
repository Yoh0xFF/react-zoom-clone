import { MessageType } from '@app/types/message';
import React from 'react';

import Message from './Message';
import './Messages.css';

export interface MessagesProps {
  messages: Array<MessageType>;
}

export default function Messages(props: MessagesProps): JSX.Element {
  const { messages } = props;

  return (
    <div className='messages_container'>
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 && message.identity === messages[index - 1].identity;

        return (
          <Message key={index} message={message} sameAuthor={sameAuthor} />
        );
      })}
    </div>
  );
}
