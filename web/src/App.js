import React from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Helthie Foodie</p>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </header>
    </div>
  );
}

export default App;
