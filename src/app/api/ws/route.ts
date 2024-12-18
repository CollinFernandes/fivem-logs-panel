import { getWebSocketServer } from 'next-ws/server';

export const GET = () => {
  const headers = new Headers();
  headers.set('Connection', 'Upgrade');
  headers.set('Upgrade', 'websocket');
  return new Response('Upgrade Required', { status: 426, headers });
};

export const SOCKET = async (client: import('ws').WebSocket, request: import('http').IncomingMessage, server: import('ws').WebSocketServer) => {
  // console.log('A client connected');

  client.on('message', (message) => {
    console.log('Received message:', message.toString());
  });

  // client.on('close', () => {
  //   console.log('A client disconnected');
  // });
};

export const sendToAllClients = (message: string) => {
  const wsServer = getWebSocketServer();

  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};