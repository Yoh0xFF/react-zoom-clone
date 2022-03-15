import React from 'react';

import './VideoButtons.css';

import { useAppSelector } from '@app/store/hooks';
import { selectConnectOnlyWithAudio } from '@app/store/slices/connection-slice-selectors';
import CameraButton from '@app/ui/room-page/components/video-section/components/CameraButton';
import LeaveRoomButton from '@app/ui/room-page/components/video-section/components/LeaveRoomButton';
import MicButton from '@app/ui/room-page/components/video-section/components/MicButton';
import SwitchToScreenShareButton from '@app/ui/room-page/components/video-section/components/SwitchToScreenShareButton';

export interface VideoButtonsProps {}

export default function VideoButtons(props: VideoButtonsProps): JSX.Element {
  const connectOnlyWithAudio = useAppSelector(selectConnectOnlyWithAudio);

  return (
    <div className='video_buttons_container'>
      <MicButton />
      {!connectOnlyWithAudio && <CameraButton />}
      <LeaveRoomButton />
      {!connectOnlyWithAudio && <SwitchToScreenShareButton />}
    </div>
  );
}
