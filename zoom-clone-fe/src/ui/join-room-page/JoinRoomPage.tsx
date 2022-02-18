import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import './JoinRoomPage.css';

import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setIsRoomHost,
  setRoomId,
} from '@app/store/slices/connection-slice';
import {
  selectConnectOnlyWithAudio,
  selectIsRoomHost,
} from '@app/store/slices/connection-slice-selectors';
import JoinRoomContent from '@app/ui/join-room-page/components/JoinRoomContent';
import JoinRoomTitle from '@app/ui/join-room-page/components/JoinRoomTitle';

export interface JoinRoomPageProps {}

export default function JoinRoomPage(props: JoinRoomPageProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const isRoomHost = useAppSelector(selectIsRoomHost);
  const connectOnlyWithAudio = useAppSelector(selectConnectOnlyWithAudio);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isRoomHost = searchParams.get('host') || false;
    if (isRoomHost) {
      dispatch(setIsRoomHost(true));
    }
  }, []);

  const setConnectOnlyWithAudioHandler = (value: boolean) => {
    dispatch(setConnectOnlyWithAudio(value));
  };

  const setRoomIdHandler = (value: string) => {
    dispatch(setRoomId(value));
  };

  const setIdentityHandler = (value: string) => {
    dispatch(setIdentity(value));
  };

  return (
    <div className='join_room_page_container'>
      <div className='join_room_page_panel'>
        <JoinRoomTitle isRoomHost={isRoomHost} />

        <JoinRoomContent
          isRoomHost={isRoomHost}
          connectOnlyWithAudio={connectOnlyWithAudio}
          setConnectOnlyWithAudio={setConnectOnlyWithAudioHandler}
          setRoomId={setRoomIdHandler}
          setIdentity={setIdentityHandler}
        />
      </div>
    </div>
  );
}
