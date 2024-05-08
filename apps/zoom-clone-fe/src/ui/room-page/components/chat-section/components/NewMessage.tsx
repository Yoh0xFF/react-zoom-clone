import { rtc } from '@app/api/webrtc';
import SendMessageButton from '@app/resources/images/sendMessageButton.svg';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import './NewMessage.css';

export default function NewMessage(): JSX.Element {
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
    if (!message) {
      return;
    }

    // Send message to other users
    rtc.sendMessageUsingDataChannel(message);

    setMessage('');
  };

  return (
    <div className='new_message_container'>
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
