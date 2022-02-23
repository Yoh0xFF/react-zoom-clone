import React, { useState } from 'react';

import './CameraButton.css';

import CameraButtonImg from '@app/resources/images/camera.svg';
import CameraButtonImgOff from '@app/resources/images/cameraOff.svg';

export interface CameraButtonProps {}

export default function CameraButton(props: CameraButtonProps): JSX.Element {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] =
    useState<boolean>(false);

  const cameraButtonPressedHandler = () => {
    setIsLocalVideoDisabled(!isLocalVideoDisabled);
  };

  return (
    <div className='video_button_container'>
      <img
        className='video_button_image'
        src={isLocalVideoDisabled ? CameraButtonImgOff : CameraButtonImg}
        alt='Camera Button'
        onClick={cameraButtonPressedHandler}
      />
    </div>
  );
}
