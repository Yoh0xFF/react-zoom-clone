import React, { useEffect } from 'react';

import './RoomPage.css';

import { rtc } from '@app/api/webrtc';
import { useAppSelector } from '@app/store/hooks';
import {
  selectIdentity,
  selectIsRoomHost,
  selectRoomId,
  selectShowOverlay,
} from '@app/store/slices/connection-slice-selectors';
import Overlay from '@app/ui/room-page/components/Overlay';
import RoomLabel from '@app/ui/room-page/components/RoomLabel';
import ChatSection from '@app/ui/room-page/components/chat-section/ChatSection';
import ParticipantsSection from '@app/ui/room-page/components/participants-section/ParticipantsSection';
import VideoSection from '@app/ui/room-page/components/video-section/VideoSection';

export default function RoomPage(): JSX.Element {
  const isRoomHost = useAppSelector(selectIsRoomHost);
  const roomId = useAppSelector(selectRoomId) || '';
  const identity = useAppSelector(selectIdentity) || 'Ioram Gordadze';
  const showOverlay = useAppSelector(selectShowOverlay);

  useEffect(() => {
    rtc.getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId);
  }, []);

  return (
    <div className='room_container'>
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
}
