import { Paper, TextField, Typography, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import HomeScreen from "./HomeScreen";
import { Player } from "@lottiefiles/react-lottie-player";
import lottie from "../assets/lottie/cursor.json";

const WelcomeScreen: React.FC = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username !== "") {
      setIsSubmit(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsername(e.target.value);
  };

  return isSubmit ? (
    <HomeScreen username={username} />
  ) : (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          padding: theme.spacing(2),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Player src={lottie} loop autoplay />
        <h2>Welcome to the live cursor application</h2>
        <Typography variant="subtitle1">
          Enter a username and follow the cursor of connected users.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Username"
            onChange={handleChange}
            sx={{ margin: theme.spacing(2) }}
          />
        </form>
      </Paper>
    </Container>
  );
};

export default WelcomeScreen;
