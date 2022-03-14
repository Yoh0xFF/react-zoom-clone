import React from 'react';

import './ChatSection.css';
import ChatLabel from './components/ChatLabel';
import Messages from './components/Messages';

import { MessageType } from '@app/types/message';

export interface ChatSectionProps {}

const messages: Array<MessageType> = [
  { identity: 'Yoh', content: 'Hey', messageCreatedByMe: true },
  { identity: 'Yoh', content: 'Hello everyone', messageCreatedByMe: true },
  { identity: 'John', content: 'Hello Yoh', messageCreatedByMe: false },
  { identity: 'Anna', content: 'Hello everyone', messageCreatedByMe: false },
];

export default function ChatSection(props: ChatSectionProps): JSX.Element {
  return (
    <div className='chat_section_container'>
      <ChatLabel />
      <Messages messages={messages} />
    </div>
  );
}
