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
            console.log('A React client has joined');
        } else {
            // an invalid client has joined. Goodbye!
            socket.disconnect(true);
        }
    });

    // A machine has connected, check to see if it's new
    // if it is, add it
    socket.on('initPerfData', async (data) => {
        // update our socket connect function-scoped variable
        macA = data.macA
        // now go check mongo!
        const mongooseResponse = await checkAndAdd(data);
        console.log(mongooseResponse);
    });

    socket.on('perfData', (data) => {
        console.log("Tick...");
        io.to('ui').emit('data', data);
    });
}

function checkAndAdd(data) {
    // because we are doing db stuff, js won't wait for the db
    // so we need to make this a promise
    return new Promise((resolve, reject) => {
        Machine.findOne(
            {macA: data.macA},
            (err, doc) => {
                if(err) {
                    // throw err;
                    reject(err);
                } else if(doc === null) {
                    // The record is not in the db
                    let newMachine = new Machine(data);
                    newMachine.save(); // actually save it
                    resolve('added');
                } else {
                    // it is in the db, just resolve
                    resolve('found');
                }
            })
    })
}

module.exports = socketMain;
