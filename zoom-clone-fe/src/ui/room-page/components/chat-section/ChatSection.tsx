import React from 'react';

import './ChatSection.css';
import ChatLabel from './components/ChatLabel';

export interface ChatSectionProps {}

export default function ChatSection(props: ChatSectionProps): JSX.Element {
  return (
    <div className='chat_section_container'>
      <ChatLabel />
    </div>
  );
}
