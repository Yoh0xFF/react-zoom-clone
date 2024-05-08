import VideoButtons from '@app/ui/room-page/components/video-section/components/VideoButtons';
import React from 'react';

import './VideoSection.css';

export interface VideoSectionProps {}

export default function VideoSection(props: VideoSectionProps): JSX.Element {
  return (
    <div className='video_section_container'>
      <VideoButtons />
    </div>
  );
}
