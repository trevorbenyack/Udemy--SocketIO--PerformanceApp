import logo from './logo.svg';
import './App.css';
import socket, {disconnectSocket, initiateSocket, subscribeToData} from './utilities/socketConnection';
import {useEffect, useState} from "react";
import Widget from "./Widget";

function App() {

    let widgets = [];

    console.log("app component loaded")

    // Declare a new state variable, which we'll call "perfData"
    const [perfData, setPerfData] = useState({});
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {

        if(!isConnected) {
            initiateSocket((c) => {
                setIsConnected(c);
            });

            subscribeToData((err, data) => {
                if(err) {
                    console.log("There was an error subscribing to the data emitter because there is no socket connection");
                    return;
                }

                // subscribe to chat cb function:
                // Inside this callback, we just got some new data!
                // so lets update state so we can re-render App --> Widget --> CPU/Mem/Info
                // we need to make a copy of current state so we can mutate it
                setPerfData(perfData => {
                    const currentState = ({...perfData});

                    // currentState is an object! Not an Array
                    // The reason for this is so we can use the machine's
                    // macA as it's property
                    currentState[data.macA] = data;

                    return currentState;
                });
            });
        } // end if(!isConnected){}
    });

    // grab each machine, by property from data
    Object.entries(perfData).forEach(([key, value]) => {
        // Anytime there is an array in react, a key should be specified
        // This allows react to treat the array almost like a linked list
        // where it can e very efficient in managing the array as things
        // change in the DOM
        widgets.push(<Widget key={key} data={value} />);

    });

    return (
        <div>
            {widgets}
        </div>
    );
}

export default App;
