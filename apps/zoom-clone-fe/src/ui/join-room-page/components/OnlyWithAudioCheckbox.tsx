import CheckImg from '@app/resources/images/check.png';
import React from 'react';

import './OnlyWithAudioCheckbox.css';

export interface OnlyWithAudioCheckboxProps {
  connectOnlyWithAudio: boolean;
  setConnectOnlyWithAudio: (value: boolean) => void;
}

export default function OnlyWithAudioCheckbox(
  props: OnlyWithAudioCheckboxProps,
): JSX.Element {
  const connectionTypeChangeHandler = () => {
    props.setConnectOnlyWithAudio(!props.connectOnlyWithAudio);
  };

  return (
    <div className='checkbox_container'>
      <div
        className='checkbox_connection'
        onClick={connectionTypeChangeHandler}>
        {props.connectOnlyWithAudio && (
          <img className='checkbox_image' src={CheckImg} alt='checkbox' />
        )}
      </div>
      <p
        className='checkbox_container_paragraph'
        onClick={connectionTypeChangeHandler}>
        Only audio
      </p>
    </div>
  );
}
