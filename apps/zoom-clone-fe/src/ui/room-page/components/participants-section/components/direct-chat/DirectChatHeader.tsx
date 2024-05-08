import { User } from '@app/types/user';
import React from 'react';

import './DirectChatHeader.css';

export interface DirectChatHeaderProps {
  activeConversation?: User;
}

export default function DirectChatHeader(
  props: DirectChatHeaderProps,
): JSX.Element {
  return (
    <div className='direct_chat_header'>
      <p className='direct_chat_header_paragraph'>
        {props.activeConversation ? props.activeConversation.identity : ''}
      </p>
    </div>
  );
}
