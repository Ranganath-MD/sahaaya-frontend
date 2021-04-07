import { io } from "socket.io-client";
import { config } from "../config";

export const socket = io(
  process.env.NODE_ENV === "production"  ? config.wsProd : config.wslocal, {
    withCredentials: true,
    transports: ["websocket"]
  });

