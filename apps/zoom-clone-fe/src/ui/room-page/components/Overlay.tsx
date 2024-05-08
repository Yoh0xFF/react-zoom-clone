import React from 'react';

import './Overlay.css';

export interface OverlayProps {}

export default function Overlay(props: OverlayProps): JSX.Element {
  return (
    <div className='overlay_container'>
      <div className='loader'></div>
    </div>
  );
}
