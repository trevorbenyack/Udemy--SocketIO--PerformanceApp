import React from "react";
import drawCircle from "./utilities/canvasLoadAnimation";

function Mem(props) {

    console.log(props);
    const {totalMem, usedMem, memUsage, freeMem} = props.memData;
    const canvas = document.querySelector('.memCanvas');
    drawCircle(canvas, memUsage * 100);
    return (
        <div className="col-sm-3 mem">
            <h3>Memory Usage</h3>
            <div className="canvas-wrapper">
                <canvas className="memCanvas" width="200" height="200"></canvas>
                <div className="mem-text">
                    {memUsage * 100}%
                </div>
            </div>
            <div>
                Total Memory: {Math.floor(totalMem/1073741824*100)/100}gb
            </div>
            <div>
                Free Memory: {Math.floor(freeMem/1073741824*100)/100}gb
            </div>

        </div>
    );
}

export default Mem;
