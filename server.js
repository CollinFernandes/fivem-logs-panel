const next = require('next');
const { Server } = require('node:http');
const { parse } = require('node:url');
const { setHttpServer, setWebSocketServer } = require('next-ws/server');
const { WebSocketServer } = require('ws');

const httpServer = new Server();
setHttpServer(httpServer);
const webSocketServer = new WebSocketServer({ noServer: true });
setWebSocketServer(webSocketServer);

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port, customServer: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  httpServer
    .on('request', async (req, res) => {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    })
    .listen(port, () => {
      console.clear();
      console.log(` ▲ Ready on http://${hostname}:${port}`);
    });
});