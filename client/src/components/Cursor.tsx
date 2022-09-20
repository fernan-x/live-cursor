import { Box } from "@mui/material";
import React from "react";
import { SocketUser } from "../types/types";

interface CursorProps {
  socketUser: SocketUser;
}

const Cursor: React.FC<CursorProps> = ({ socketUser }: CursorProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: socketUser.position.top,
        left: socketUser.position.left,
      }}
    >
      <Box>👆</Box>
      <span>{socketUser.name}</span>
    </Box>
  );
};

export default Cursor;
