import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;

export const initSocket = (base = (import.meta.env.VITE_API_BASE || "http://localhost:4000")) => {
  socket = io(base, { transports: ["websocket"] });
  return socket;
};

export const getSocket = () => socket;
