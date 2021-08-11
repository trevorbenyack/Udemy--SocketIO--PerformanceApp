import React from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";

function Widget() {

    return (
        <div>
            <h1>Widget</h1>
            <Cpu />
            <Mem />
            <Info />
        </div>
    )
}

export default Widget
