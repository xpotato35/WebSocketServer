const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ---- HTTP 靜態頁面 ----
app.use(express.static(path.join(__dirname, 'public'))); // public 資料夾放 index.html

// ---- WebSocket 連線處理 ----
wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send(`Server received: ${message.toString()}`);
  });

  ws.on('close', () => {
    console.log('client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});