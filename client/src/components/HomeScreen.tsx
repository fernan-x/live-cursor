import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { Paper } from "@mui/material";
import useMousePosition from "../hooks/useMousePosition";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { SocketUser } from "../types/types";
import ConnectionBadge from "./ConnectionBadge";
import Cursor from "./Cursor";

interface HomeScreenProps {
  username: string;
}

let socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
  import.meta.env.VITE_SERVER_URL + ":" + import.meta.env.VITE_SERVER_PORT
);

const HomeScreen: React.FC<HomeScreenProps> = ({
  username,
}: HomeScreenProps) => {
  let requestTimeout: number | undefined = undefined;
  const [ref, mousePosition] = useMousePosition();
  const [connectedUsers, setConnectedUsers] = useState<SocketUser[]>([]);

  useEffect(() => {
    socket.on("update-mouse-position", (updatedUser: SocketUser) => {
      let newUsers = connectedUsers;
      newUsers = connectedUsers.filter(
        (elem) => elem.client_id !== updatedUser.client_id
      );
      newUsers.push(updatedUser);
      setConnectedUsers(newUsers);
    });

    return () => {
      if (socket) {
        socket.off("update-mouse-position");
      }
    };
  }, []);

  /**
   * Send the socket event to move mouse
   *
   * @param {SocketUser}  socketUser     Socket user with new mouse position
   */
  const emitCursorPosition = (socketUser: SocketUser): void => {
    if (socket && socket.connected) {
      socket.emit("mouse-move", socketUser);
    }
  };

  useEffect(() => {
    requestTimeout = setTimeout(() => {
      emitCursorPosition({ name: username, position: mousePosition });
    }, 10); // We can play on the ms time to have a better animation

    return () => clearTimeout(requestTimeout);
  }, [mousePosition]);

  return (
    <Paper ref={ref} sx={{ width: "100%", height: "100%" }}>
      <>
        <ConnectionBadge isConnected={socket.connected} />
        {connectedUsers.map((element: SocketUser) => (
          <Cursor socketUser={element} key={element.client_id} />
        ))}
      </>
    </Paper>
  );
};

export default HomeScreen;
