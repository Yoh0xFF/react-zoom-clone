import React, { useState } from 'react';

import './MicButton.css';

import { rtc } from '@app/api/web-rtc-handler';
import MicButtonImg from '@app/resources/images/mic.svg';
import MicButtonImgOff from '@app/resources/images/micOff.svg';

export interface MicButtonProps {}

export default function MicButton(props: MicButtonProps): JSX.Element {
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);

  const micButtonPressedHandler = () => {
    rtc.toggleMic(isMicMuted);
    setIsMicMuted(!isMicMuted);
  };

  return (
    <div className='video_button_container'>
      <img
        className='video_button_image'
        src={isMicMuted ? MicButtonImgOff : MicButtonImg}
        alt='Mic Button'
        onClick={micButtonPressedHandler}
      />
    </div>
  );
}
