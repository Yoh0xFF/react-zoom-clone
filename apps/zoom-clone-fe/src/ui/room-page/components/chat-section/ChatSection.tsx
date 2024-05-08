import { useAppSelector } from '@app/store/hooks';
import { selectMessages } from '@app/store/slices/chat-slice-selectors';
import React from 'react';

import './ChatSection.css';
import ChatLabel from './components/ChatLabel';
import Messages from './components/Messages';
import NewMessage from './components/NewMessage';

export default function ChatSection(): JSX.Element {
  const messages = useAppSelector(selectMessages);

  return (
    <div className='chat_section_container'>
      <ChatLabel />
      <Messages messages={messages} />
      <NewMessage />
    </div>
  );
}
