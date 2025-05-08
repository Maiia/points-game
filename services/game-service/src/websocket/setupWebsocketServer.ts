import WebSocket from "ws";
import { registerClient } from "./connectionManager";

export const setupWebsocketServer = (server: import("http").Server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url ?? "", `http://${req.headers.host}`);
    const gameId = url.searchParams.get("gameId");
    if (!gameId) {
      ws.close();
      return;
    }

    registerClient(gameId, ws);
  });

  console.log("✅ WebSocket server is ready");
};
