const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/perfData', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB");
}).catch( () => {
    console.error("There has been an error connecting to MongoDB");
});

const Machine = require('./models/Machine');

function socketMain(io, socket) {
    let macA;
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
    });

    // A machine has connected, check to see if it's new
    // if it is, add it
    socket.on('initPerfData', (data) => {
        // update our socket connect function-scoped variable
        macA = data.macA
        // now go check mongo!
        checkAndAdd(macA);
    });

    socket.on('perfData', (data) => {
        // console.log(data);
    });
}

module.exports = socketMain;
