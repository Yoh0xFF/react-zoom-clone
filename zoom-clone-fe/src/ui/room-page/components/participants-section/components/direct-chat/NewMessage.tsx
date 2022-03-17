import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import './NewMessage.css';

import { wss } from '@app/api/wss';
import SendMessageButton from '@app/resources/images/sendMessageButton.svg';
import { User } from '@app/types/user';

export interface NewMessageProps {
  activeConversation?: User;
  identity?: string;
}

export default function NewMessage(props: NewMessageProps): JSX.Element {
  const [message, setMessage] = useState<string>('');

  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const keyPressedHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessageHandler();
    }
  };

  const sendMessageHandler = () => {
    if (!message || !props.activeConversation || !props.identity) {
      return;
    }

    // Send message to other users
    // rtc.sendMessageUsingDataChannel(message);
    wss.sendDirectMessage({
      receiverSocketId: props.activeConversation.socketId,
      identity: props.identity,
      content: message,
    });

    setMessage('');
  };

  return (
    <div className='new_message_container new_message_direct_border'>
      <input
        className='new_message_input'
        type='text'
        placeholder='Type your message...'
        value={message}
        onChange={textChangeHandler}
        onKeyPress={keyPressedHandler}
      />
      <img
        className='new_message_button'
        src={SendMessageButton}
        alt='send message button'
        onClick={sendMessageHandler}
      />
    </div>
  );
}
