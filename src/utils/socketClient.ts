import { io } from "socket.io-client";
import { config } from "../config";
import { apiService } from "./axiosBaseRequest";

export const configureSocket = () => {
  const connection = io(
    process.env.NODE_ENV === "production" ? config.wsProd : config.wslocal,
    {
      withCredentials: true,
      reconnection: true,
      transports: ["websocket"],
      query: { token: apiService.service.defaults.headers["Authorization"] },
    }
  );

  return connection;
};

export const socket = configureSocket();
