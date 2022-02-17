import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import './JoinRoomPage.css';

import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { setIsRoomHost } from '@app/store/slices/host-slice';
import { selectIsRoomHost } from '@app/store/slices/host-slice-selectors';
import JoinRoomContent from '@app/ui/join-room-page/components/JoinRoomContent';
import JoinRoomTitle from '@app/ui/join-room-page/components/JoinRoomTitle';

export interface JoinRoomPageProps {}

export default function JoinRoomPage(props: JoinRoomPageProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const isRoomHost = useAppSelector(selectIsRoomHost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isRoomHost = searchParams.get('host') || false;
    if (isRoomHost) {
      dispatch(setIsRoomHost(true));
    }
  }, []);

  return (
    <div className='join_room_page_container'>
      <div className='join_room_page_panel'>
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent isRoomHost={isRoomHost} />
      </div>
    </div>
  );
}
