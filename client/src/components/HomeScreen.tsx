import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Paper } from "@mui/material";
import useMousePosition from "../hooks/useMousePosition";

const socket = io(
  import.meta.env.VITE_SERVER_URL + ":" + import.meta.env.VITE_SERVER_PORT
);

const HomeScreen: React.FC = () => {
  let requestTimeout: number | undefined = undefined;
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

  return <Paper ref={ref}>This is the homescreen</Paper>;
};

export default HomeScreen;
