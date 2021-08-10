// The node program that captures local performance data
// and sends it up to the socket.io server

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
const cpus = os.cpus();

const freeMem = os.freemem();
const totalMem = os.totalmem();
const usedMem = totalMem - freeMem;

const memUsage = Math.floor(usedMem/totalMem * 100)/100;

const osType = os.type() == 'Darwin' ? 'macOS' : os.type();
console.log(osType);

const upTime = os.upTime();
console.log(upTime);

const cpuModel = cpus[0].model;
const cpuSpeed = cpus[0].speed;
const numCores = cpus.length;
const cpuSpeed = cpus[0].speed;
