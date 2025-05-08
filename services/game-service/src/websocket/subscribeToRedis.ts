import { redisSubscriber } from "../redisClient";
import { broadcastToGameClients } from "./connectionManager";

export const subscribeToRedis = async () => {
  await redisSubscriber.pSubscribe("game:*:diceRolled", (message, channel) => {
    console.log(`[Redis] ${channel}: ${message}`);
    const match = channel.match(/^game:(.*):diceRolled$/);
    if (!match) return;
    const gameId = `${match[1]}`;

    console.log(`[Redis] Broadcasting to game ${gameId}`, message);
    broadcastToGameClients(
      gameId,
      JSON.stringify({
        event: "diceRolled",
        data: JSON.parse(message),
      }),
    );
  });
};
