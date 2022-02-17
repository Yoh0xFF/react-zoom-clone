import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import IntroductionPage from '@app/ui/introduction-page/IntroductionPage';
import JoinRoomPage from '@app/ui/join-room-page/JoinRoomPage';
import RoomPage from '@app/ui/room-page/RoomPage';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<IntroductionPage />} />

            <Route path='/join-room' element={<JoinRoomPage />} />

            <Route path='/room' element={<RoomPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}
