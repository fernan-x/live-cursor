import { useState, useEffect } from "react";
import useMousePosition from "./hooks/useMousePosition";
import reactLogo from "./assets/react.svg";
import io from "socket.io-client";
import "./App.css";
import { CursorPosition } from "./types/types";

const socket = io("http://localhost:3001");

function App() {
  let requestTimeout: number | undefined = undefined;
  const [count, setCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [ref, mousePosition] = useMousePosition();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      setIsConnected(false);
    });

    socket.on("update-mouse-position", (position) => {
      console.log("Receive position from :");
      console.log(position);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("update-mouse-position");
    };
  }, []);

  /**
   * Send the socket event to move mouse
   *
   * @param {CursorPosition}  mousePosition     Mouse position
   */
  const emitCursorPosition = (mousePosition: CursorPosition): void => {
    socket.emit("mouse-move", mousePosition);
  };

  useEffect(() => {
    requestTimeout = setTimeout(() => {
      console.log(
        `Emit position => left : ${mousePosition.left}, top : ${mousePosition.top}`
      );
      emitCursorPosition(mousePosition);
    }, 300);

    return () => clearTimeout(requestTimeout);
  }, [mousePosition]);

  return (
    <div className="App" ref={ref}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
        <br />
        {isConnected ? "🟢 Connected" : "🔴 Not connected"}
      </p>
    </div>
  );
}

export default App;
