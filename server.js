const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const keywords = {
  'split': ['url1', 'url2'],
  'insert': ['url3', 'url4'],
  
};

const config = {
  maxThreads: 3, 
  speedPerThread: 1024 * 1024, 
};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const urls = keywords[message];
    if (urls) {
      ws.send(JSON.stringify({ type: 'urls', data: urls }));
    } else {
      ws.send(JSON.stringify({ type: 'error', data: 'Invalid keyword' }));
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
