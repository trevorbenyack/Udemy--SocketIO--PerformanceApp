import React from "react";
import drawCircle from "./utilities/canvasLoadAnimation";


function Cpu(props) {

    const cpuWidgetId = `cpu-widget-${props.cpuData.macA}`;

    const canvas = document.querySelector(`.${cpuWidgetId}`);
    drawCircle(canvas, props.cpuData.cpuLoad);
    return (
        <div className="col-sm-3 cpu">
            <h3>CPU load</h3>
            <div className="canvas-wrapper">
                <canvas className={cpuWidgetId} width="200" height="200" />
                <div className="cpu-text">{props.cpuData.cpuLoad}%</div>
            </div>
        </div>
    )
}

export default Cpu
