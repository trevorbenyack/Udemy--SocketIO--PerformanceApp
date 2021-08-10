function socketMain(io, socket) {
    // console.log("A socket connected! ", socket.id);
    // console.log("Someone called me! I'm socketMain!")

    socket.on('clientAuth', (key) => {
        if(key === 'asdfasdasdf234513') {
            // valid nodeClient
            socket.join('clients');
        } else if (key === 'adsfasdfsdasf') {
            // valid UI client
            socket.join('ui');
        } else {
            // an invalid client has joined. Goodbye!
            socket.disconnect(true);
        }
    })

    socket.on('perfData', (data) => {
        console.log(data);
    });
}

module.exports = socketMain;
