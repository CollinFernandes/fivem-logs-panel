'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { WebSocketProvider } from 'next-ws/client';

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider session={null}>
      <WebSocketProvider url="wss://localhost:3000/api/ws">{children}</WebSocketProvider>
    </SessionProvider>
  );
};

export default SessionWrapper;
