import { DirectMessageType } from '@app/types/message';
import React from 'react';

import './SingleMessage.css';

export interface SingleMessageProps {
  message: DirectMessageType;
}

export default function SingleMessage(props: SingleMessageProps): JSX.Element {
  const containerStyling = props.message.messageCreatedByMe
    ? 'direct_message_container_author'
    : 'direct_message_container_receiver';

  const messageStyling = props.message.messageCreatedByMe
    ? 'author_direct_message'
    : 'receiver_direct_message';

  return (
    <div className={containerStyling}>
      <p className={messageStyling}>{props.message.content}</p>
    </div>
  );
}
