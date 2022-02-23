import React from 'react';

import './RoomPage.css';

import { useAppSelector } from '@app/store/hooks';
import { selectRoomId } from '@app/store/slices/connection-slice-selectors';
import RoomLabel from '@app/ui/room-page/components/RoomLabel';
import ChatSection from '@app/ui/room-page/components/chat-section/ChatSection';
import ParticipantsSection from '@app/ui/room-page/components/participants-section/ParticipantsSection';
import VideoSection from '@app/ui/room-page/components/video-section/VideoSection';

export default function RoomPage(): JSX.Element {
  const roomId = useAppSelector(selectRoomId) || '12345';

  return (
    <div className='room_container'>
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
    </div>
  );
}
