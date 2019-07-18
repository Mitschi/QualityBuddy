const CubejsServer = require('@cubejs-backend/server');


const server = new CubejsServer();


server.listen().then(({ port }) => {
  console.log(`🚀 Cube.js server is listening on ${port}`);
});

const io = require('socket.io')(server)

// Listen to events on our socket
io.sockets.on('connection', (socket) => {
	console.log('Client connected: ' + socket.id)

	socket.on('mouse', (data) => socket.broadcast.emit('mouse', data))

	socket.on('disconnect', () => console.log('Client has disconnected'))
})
