import { MessageType } from '@app/types/message';
import React from 'react';

import './Message.css';

export interface MessageProps {
  message: MessageType;
  sameAuthor: boolean;
}

export default function Message(props: MessageProps): JSX.Element {
  const { identity, content, messageCreatedByMe } = props.message;

  const alignClass = messageCreatedByMe
    ? 'message_align_right'
    : 'message_align_left';

  const authorText = messageCreatedByMe ? 'Yoh' : identity;

  const contentStyles = messageCreatedByMe
    ? 'message_right_styles'
    : 'message_left_styles';

  return (
    <div className={`message_container ${alignClass}`}>
      {!props.sameAuthor && <p className='message_title'>{authorText}</p>}
      <p className={`message_content ${contentStyles}`}>{content}</p>
    </div>
  );
}
