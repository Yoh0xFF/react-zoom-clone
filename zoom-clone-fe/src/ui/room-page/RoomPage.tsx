import React from 'react';

import './RoomPage.css';

import ChatSection from '@app/ui/room-page/components/chat-section/ChatSection';
import ParticipantsSection from '@app/ui/room-page/components/participants-section/ParticipantsSection';
import VideoSection from '@app/ui/room-page/components/video-section/VideoSection';

export default function RoomPage(): JSX.Element {
  return (
    <div className='room_container'>
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
    </div>
  );
}
