import React, { useEffect } from 'react';

import './IntroductionPage.css';

import logo from '@app/resources/images/logo.png';
import { useAppDispatch } from '@app/store/hooks';
import { setIsRoomHost } from '@app/store/slices/connection-slice';
import ConnectingButtons from '@app/ui/introduction-page/components/ConnectingButtons';

export default function IntroductionPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsRoomHost(false));
  }, []);

  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        <img src={logo} alt='logo' className='introduction_page_image' />
        <ConnectingButtons />
      </div>
    </div>
  );
}
