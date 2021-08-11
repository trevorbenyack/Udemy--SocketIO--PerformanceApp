import logo from './logo.svg';
import './App.css';
import socket from './utilities/socketConnection';
import {useEffect, useState} from "react";
import Widget from "./Widget";

function App() {

  // Declare a new state variable, which we'll call "perfData"
  const [perfData, setPerfData] = useState({});

  useEffect(() => {
    socket.on('data', (data) => {
      console.log(data);
    })
  });

  return (
      <div>
        <Widget />
      </div>
  );
}

export default App;
