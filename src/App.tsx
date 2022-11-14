import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Button className="m-3" appearance="primary">Click</Button>
      </header>
    </div>
  );
}

export default App;
