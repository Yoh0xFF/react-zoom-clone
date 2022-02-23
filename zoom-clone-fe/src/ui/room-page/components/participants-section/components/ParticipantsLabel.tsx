import React from 'react';

import './ParticipantsLabel.css';

export interface ParticipantsLabelProps {}

export default function ParticipantsLabel(
  props: ParticipantsLabelProps
): JSX.Element {
  return (
    <div className='participants_label_container'>
      <p className='participants_label_paragraph'>PARTICIPANTS</p>
    </div>
  );
}
