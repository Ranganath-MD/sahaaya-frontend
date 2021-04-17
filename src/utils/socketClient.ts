import { io } from "socket.io-client";
import { config } from "../config";
import { apiService } from "./axiosBaseRequest";

export const socket = io(
  process.env.NODE_ENV === "production"  ? config.wsProd : config.wslocal, {
    withCredentials: true,
    transports: ["websocket"],
    query: { token : apiService.service.defaults.headers["Authorization"] }
  });

