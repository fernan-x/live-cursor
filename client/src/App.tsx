import { useState, useEffect } from "react";
import "./App.css";
import { CursorPosition } from "./types/types";
import { WelcomeScreen } from "./components";

function App() {
  return (
    <div className="App">
      <WelcomeScreen />
    </div>
  );
}

export default App;
