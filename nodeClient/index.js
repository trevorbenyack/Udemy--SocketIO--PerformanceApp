// The node program that captures local performance data
// and sends it up to the socket.io server

const io = require('socket.io-client');
let socket = io('http://127.0.0.1:8181');

socket.on('connect', () => {
    // console.log("I connected to the socket server!");

    // We need a way to identify this machine to whomever concerned

    const nI = os.networkInterfaces();
    let macA;

    // loop through all the network interfaces for this machine and find a
    // non-internal one
    for (let key in nI) {

        //TODO: FOR TESTING PURPOSES!!!
        macA = Math.floor(Math.random() * 3 + 1);
        break;
        // END TESTING

        if(!nI[key][0].internal) {
            macA = nI[key][0].mac;
            break;
        }
    }

    // client auth with single key value
    socket.emit('clientAuth', 'asdfasdasdf234513');


    performanceData().then((allPerformanceData) => {
        allPerformanceData.macA = macA;
        socket.emit('initPerfData', allPerformanceData)
    });


    // start sending data over on interval
    let perfDataInterval = setInterval(() => {
        performanceData().then((allPerformanceData) => {
            // console.log("Performance data is:")
            // console.log(allPerformanceData);
            allPerformanceData.macA = macA;
            socket.emit('perfData', allPerformanceData);
        })
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(perfDataInterval);
    });

})

// What do we need to know from node about performance?
// - CUP load (current
// - Memory Usage
//      - Free
//      - Total
// - OS Type
// - Uptime
// CPU Info
//      - Type
//      - Number of cores
//      - Clock speed

const os = require('os');

function performanceData() {
    return new Promise(async (resolve, reject) => {
        const cpus = os.cpus();

        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        const usedMem = totalMem - freeMem;

        const memUsage = Math.floor(usedMem/totalMem * 100)/100;

        const osType = os.type() === 'Darwin' ? 'macOS' : os.type();
        console.log(osType);

        const upTime = os.uptime();
        console.log(upTime);

        const cpuModel = cpus[0].model;
        const cpuSpeed = cpus[0].speed;
        const numCores = cpus.length;
        const cpuLoad = await getCpuLoad();
        const isActive = true;
        resolve({
            freeMem,
            totalMem,
            usedMem,
            memUsage,
            osType,
            upTime,
            cpuModel,
            numCores,
            cpuSpeed,
            cpuLoad,
            isActive
        });
    }); // end return new Promise
} // end performanceData()


// cpus is all numCores... we need the average all the cores
// which will give us the cpu average
function cpuAverage() {
    const cpus = os.cpus();
    // get ms in each mode, BUT this number is since reboot
    // so get it now, and get it in 100ms and compare
    let idleMs = 0;
    let totalMs = 0;
    // loop through each core
    cpus.forEach((aCore) => {
        // loop through each property of the current core
        for(type in aCore.times) {
            totalMs += aCore.times[type];
        }
        idleMs += aCore.times.idle;
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }
}


// bc the times property is time since boot, we will get
// now times, and 100ms from now times. Compare them, that will
// give us current load
function getCpuLoad() {
    return new Promise((resolve, reject) => {
        const start = cpuAverage();
        setTimeout(() => {
            const end = cpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start.total;

            // calculate the % of used cpu
            const percentageCpu = 100 - Math.floor(100 * idleDifference/totalDifference)
            resolve(percentageCpu);
        }, 100);
    });
}
