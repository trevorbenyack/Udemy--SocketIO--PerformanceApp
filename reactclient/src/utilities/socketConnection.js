import io from 'socket.io-client';
let socket = io.connect('http://localhost:8181');

socket.emit('clientAuth', 'adsfasdfsdasf');

//console.log(socket);

export default socket;
