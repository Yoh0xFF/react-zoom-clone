import React from 'react';

import './ConversationNotChosen.css';

export default function ConversationNotChosen(): JSX.Element {
  return (
    <div className='conversation_not_chosen_overlay'>
      <p className='conversation_not_chosen_overlay_text'>
        Conversation not chosen
      </p>
    </div>
  );
}
