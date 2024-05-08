import { wss } from '@app/api/wss';
import IntroductionPage from '@app/ui/introduction-page/IntroductionPage';
import JoinRoomPage from '@app/ui/join-room-page/JoinRoomPage';
import RoomPage from '@app/ui/room-page/RoomPage';
import React, { useEffect } from 'react';
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import './App.css';

const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <IntroductionPage />,
  },
  {
    path: 'join-room',
    element: <JoinRoomPage />,
  },
  {
    path: 'room',
    element: <RoomPage />,
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  useEffect(() => {
    wss.connect();
  }, []);

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
