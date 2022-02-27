import React from 'react';

import './ParticipantsSection.css';

import { useAppSelector } from '@app/store/hooks';
import { selectParticipants } from '@app/store/slices/connection-slice-selectors';
import Participants from '@app/ui/room-page/components/participants-section/components/Participants';
import ParticipantsLabel from '@app/ui/room-page/components/participants-section/components/ParticipantsLabel';

export interface ParticipantsSectionProps {}

export default function ParticipantsSection(
  props: ParticipantsSectionProps
): JSX.Element {
  const participants = useAppSelector(selectParticipants);

  return (
    <div className='participants_section_container'>
      <ParticipantsLabel />
      <Participants participants={participants} />
    </div>
  );
}
