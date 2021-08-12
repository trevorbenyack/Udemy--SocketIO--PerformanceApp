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
        macA,
        isActive
    } = props.data


    const cpu = {cpuLoad, macA};
    const mem = {totalMem, usedMem, memUsage, freeMem, macA};
    const info = {macA, osType, upTime, cpuModel, numCores, cpuSpeed};

    let notActiveDiv = '';
    if(!isActive){
        notActiveDiv = <div className="not-active">Offline</div>
    }

    return (
        <div className="widget col-sm-12">
            {notActiveDiv}
            <Cpu cpuData={cpu}/>
            <Mem memData={mem}/>
            <Info infoData={info}/>
        </div>
    )
}

export default Widget
