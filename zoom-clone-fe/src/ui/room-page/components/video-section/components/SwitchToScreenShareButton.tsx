import React, { useState } from 'react';

import './SwitchToScreenShareButton.css';

import SwitchImg from '@app/resources/images/switchToScreenSharing.svg';

export interface SwitchToScreenShareButtonProps {}

export default function SwitchToScreenShareButton(
  props: SwitchToScreenShareButtonProps
): JSX.Element {
  const [isScreenSharingActive, setIsScreenSharingActive] =
    useState<boolean>(false);

  const screenShareToggleHandler = () => {
    setIsScreenSharingActive(!isScreenSharingActive);
  };

  return (
    <div className='video_button_container'>
      <img
        className='video_button_image'
        src={SwitchImg}
        alt='Screen Share Button'
        onClick={screenShareToggleHandler}
      />
    </div>
  );
}
