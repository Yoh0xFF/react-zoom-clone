import React from 'react';

import './ParticipantsSection.css';

import Participants from '@app/ui/room-page/components/participants-section/components/Participants';
import ParticipantsLabel from '@app/ui/room-page/components/participants-section/components/ParticipantsLabel';

export interface ParticipantsSectionProps {}

export default function ParticipantsSection(
  props: ParticipantsSectionProps
): JSX.Element {
  return (
    <div className='participants_section_container'>
      <ParticipantsLabel />
      <Participants />
    </div>
  );
}
