import express from 'express';
import http from 'http';
import webrtcConnect  from './webrtc/connection';



const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Basic HTTP server with Express only
const app = express();

/**
 * Create an HTTP
 * WebSocket (e.g., Socket.IO) support
 * Combining Express with HTTPS
 * Custom server-level logic
 */
const server = http.createServer(app);

// webrtc connection
webrtcConnect(
  server,
  {
    cors: {
      origin: "http://localhost:4200", // Allow your frontend's origin
      methods: ["GET", "POST"]
    }
  }
);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// app.listen(port, host, () => {
//   console.log(`[ ready ] http://${host}:${port}`);
// });

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
