import { rtc } from '@app/api/webrtc';
import SwitchImg from '@app/resources/images/switchToScreenSharing.svg';
import React, { useState } from 'react';

import LocalScreenSharingPreview from './LocalScreenSharingPreview';
import './SwitchToScreenShareButton.css';

export interface SwitchToScreenShareButtonProps {}

export default function SwitchToScreenShareButton(
  props: SwitchToScreenShareButtonProps,
): JSX.Element {
  const [isScreenSharingActive, setIsScreenSharingActive] =
    useState<boolean>(false);
  const [screenSharingStream, setScreenSharingStream] = useState<MediaStream>();

  const screenShareToggleHandler = async () => {
    if (!isScreenSharingActive) {
      let stream;
      try {
        stream = await (navigator.mediaDevices as any).getDisplayMedia({
          audio: false,
          video: true,
        });
      } catch (err) {
        console.log('Failed to get screen sharing stream', err);
      }

      if (stream) {
        setScreenSharingStream(stream);
        setIsScreenSharingActive(true);
        // Switch the video track wich we are sharing with other users
        rtc.toggleScreenShare(true, stream);
      }
    } else {
      // Switch the video track wich we are sharing with other users
      rtc.toggleScreenShare(false);
      setIsScreenSharingActive(false);

      // Stop the screen sharing stream
      screenSharingStream?.getTracks().forEach((x) => x.stop());
      setScreenSharingStream(undefined);
    }
  };

  return (
    <>
      <div className='video_button_container'>
        <img
          className='video_button_image'
          src={SwitchImg}
          alt='Screen Share Button'
          onClick={screenShareToggleHandler}
        />
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
}
