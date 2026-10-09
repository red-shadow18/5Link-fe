import { Server } from 'socket.io';


const io = new Server(3001, {
  cors: { origin: '*' }
});

console.log('Sequence WebSocket server running on port 3001');

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
});