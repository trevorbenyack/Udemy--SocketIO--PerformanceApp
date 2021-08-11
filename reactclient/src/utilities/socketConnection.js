import io from 'socket.io-client';
let socket;

export const initiateSocket = (cb) => {
    console.log(`Connecting socket...`);
    socket = io.connect('http://localhost:8181');
    socket.emit('clientAuth', 'adsfasdfsdasf');
    cb(true);
}
export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
}
export const subscribeToData = (cb) => {
    if (!socket) {
        return true;
    }

    socket.on('data', (data) => {
        console.log('Data event received');
        return cb(null, data);
    });
}




export default socket;
