const CubejsServer = require('@cubejs-backend/server');

const server = new CubejsServer();

// Web sockets
const io = require('socket.io')(server)

// Listen to events on our socket
io.sockets.on('connection', (socket) => {
	console.log('Client connected: ' + socket.id)

	socket.on('Send', (data) => socket.broadcast.emit('Send', data))

	socket.on('disconnect', () => console.log('Client has disconnected'))
})

server.listen(5000).then(({ port }) => {
  console.log(`🚀 Cube.js server is listening on ${port}`);
});
