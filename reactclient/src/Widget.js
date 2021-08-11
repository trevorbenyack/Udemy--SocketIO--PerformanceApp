import React from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import './widget.css'

function Widget(props) {

    const {
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
        macA
    } = props.data

    const cpu = {cpuLoad};
    const mem = {totalMem, usedMem, memUsage, freeMem};
    const info = {macA, osType, upTime, cpuModel, numCores, cpuSpeed};

    return (
        <div>
            <Cpu cpuData={cpu}/>
            <Mem memData={mem}/>
            <Info infoData={info}/>
        </div>
    )
}

export default Widget
