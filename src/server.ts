import dotenv from "dotenv";
dotenv.config();

import { Server } from "http";
import app from "./app";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  handleShotdown(server);

  return server;
};

const handleShotdown = (server: Server) => {
  // Handle shutdown
  process.on("SIGINT", () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });
  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(1);
    });
  });
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(1);
    });
  });
  process.on("exit", (code) => {
    console.log(`Process exited with code: ${code}`);
  });
  process.on("warning", (warning) => {
    console.warn("Warning:", warning);
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
