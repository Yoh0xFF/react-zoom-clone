import { DirectMessageType } from '@app/types/message';
import React, { useEffect, useRef } from 'react';

import './MessagesContainer.css';
import SingleMessage from './SingleMessage';

export interface MessagesContainerProps {
  messages: Array<DirectMessageType>;
}

export default function MessagesContainer(
  props: MessagesContainerProps,
): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef) {
      return;
    }
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [props.messages]);

  return (
    <div className='direct_messages_container'>
      {props.messages.map((x) => {
        return (
          <SingleMessage
            key={`${x.identity}-${x.content}-${Math.random()}`}
            message={x}
          />
        );
      })}

      <div ref={scrollRef} />
    </div>
  );
}
