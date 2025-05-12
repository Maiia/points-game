import WebSocket from "ws";

const clientsByGameId: Map<string, Set<WebSocket>> = new Map();

export const registerClient = (gameId: string, ws: WebSocket) => {
  if (!clientsByGameId.has(gameId)) {
    clientsByGameId.set(gameId, new Set());
  }
  clientsByGameId.get(gameId)?.add(ws);

  ws.on("close", () => {
    clientsByGameId.get(gameId)?.delete(ws);
  });
};

export const broadcastToGameClients = (gameId: string, message: string) => {
  clientsByGameId.get(gameId)?.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
};
