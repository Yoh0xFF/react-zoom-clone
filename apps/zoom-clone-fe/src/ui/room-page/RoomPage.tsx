import { rtc } from '@app/api/webrtc';
import { useAppSelector } from '@app/store/hooks';
import {
  selectConnectOnlyWithAudio,
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
import React, { useEffect } from 'react';

import './RoomPage.css';

export default function RoomPage(): JSX.Element {
  const isRoomHost = useAppSelector(selectIsRoomHost);
  const connectOnlyWithAudio = useAppSelector(selectConnectOnlyWithAudio);
  const roomId = useAppSelector(selectRoomId) || '';
  const identity = useAppSelector(selectIdentity) || '';
  const showOverlay = useAppSelector(selectShowOverlay);

  useEffect(() => {
    if (!isRoomHost && !roomId) {
      const siteUrl = window.location.origin;
      window.location.href = siteUrl;
      return;
    }

    rtc.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      connectOnlyWithAudio,
      roomId,
    );
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
