declare module 'next-ws' {
  import { NextApiRequest, NextApiResponse } from 'next';
  import { Server as WebSocketServer } from 'ws';

  export function createWebSocketHandler(handler: (ws: WebSocket, req: NextApiRequest) => void): (req: NextApiRequest, res: NextApiResponse) => void;
}
