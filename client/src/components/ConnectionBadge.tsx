import { Alert } from "@mui/material";
import React from "react";

interface ConnectionBadgeProps {
  isConnected: boolean;
}

const ConnectionBadge: React.FC<ConnectionBadgeProps> = ({
  isConnected,
}: ConnectionBadgeProps) => {
  return (
    <>
      {isConnected ? (
        <Alert severity="success">You are connected</Alert>
      ) : (
        <Alert severity="error">You are nt connected</Alert>
      )}
    </>
  );
};

export default ConnectionBadge;
