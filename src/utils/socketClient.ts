import { io } from "socket.io-client";
import { config } from "../config";

export const configureSocket = () => {
  const connection = io(
    process.env.NODE_ENV === "production" ? config.wsProd : config.wslocal,
    {
      withCredentials: true,
      reconnection: true,
      transports: ["websocket"]
    }
  );
  connection.connect();
  return connection;
};

export const socket = configureSocket();
