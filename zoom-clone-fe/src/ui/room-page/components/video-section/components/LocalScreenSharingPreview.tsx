import React, { useEffect, useRef } from 'react';

import './LocalScreenSharingPreview.css';

export interface LocalScreenSharingPreviewProps {
  stream?: MediaStream;
}

export default function LocalScreenSharingPreview(
  props: LocalScreenSharingPreviewProps
): JSX.Element {
  const localPreviewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = localPreviewRef.current;
    if (!video || !props.stream) {
      return;
    }

    video.srcObject = props.stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [props.stream]);

  return (
    <div className='local_screen_share_preview'>
      <video muted autoPlay ref={localPreviewRef} />
    </div>
  );
}
