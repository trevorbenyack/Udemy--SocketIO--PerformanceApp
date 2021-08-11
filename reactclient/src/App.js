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

                console.log("perfData is:");
                console.log(perfData);


                setPerfData(perfData => {
                    const currentState = ({...perfData});

                    console.log("pre currentState is:");
                    console.log(currentState);
                    console.log(`data.macA is: ${data.macA}`);


                    // currentState is an object! Not an Array
                    // The reason for this is so we can use the machine's
                    // macA as it's property
                    currentState[data.macA] = data;

                    console.log("post currentState is:");
                    console.log(currentState);

                    console.log("pre setPerf()")

                    return currentState;
                });
                console.log("after setPerf() has been called")

                // console.log("post setPerf currentstate is:");
                // console.log(currentState);

                console.log("perfData is:");
                console.log(perfData);



                // console.log(currentState);

            });
        } // end if(!isConnected){}
    });

    console.log(perfData);

    // grab each machine, by property from data
    Object.entries(perfData).forEach(([key, value]) => {


        // Anytime there is an array in react, a key should be specified
        // This allows react to treat the array almost like a linked list
        // where it can e very efficient in managing the array as things
        // change in the DOM
        widgets.push(<Widget key={key} data={value} />);

        // console.log(`key is:`);
        // console.log(key);
        // console.log('value is:');
        // console.log(value);
    });

    console.log("widgets is:");
    console.log(widgets);


    return (
        <div>
            {widgets}
        </div>
    );
}

export default App;
