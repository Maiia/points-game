// import { LiveGameState } from "@points-game/types/gameState";
import redisClient, { redisPublisher } from "../redisClient";
import { mockGameState } from "../mocks/mock-game-state";
import { LiveGameState } from "../types/gameState";

export const setGameState = async (
  gameId: string,
  newGame: any,
): Promise<void> => {
  await redisClient.set(gameId, JSON.stringify(newGame));
};

export const getGameState = async (gameId: string): Promise<LiveGameState> => {
  const game = await redisClient.get(gameId);
  if (game) {
    return JSON.parse(game);
  } else {
    // TODO remove when logic for creation is implemented
    console.log("Game not found, TEMPORARY create new one");
    // throw Error("Game not found");
    return mockGameState;
  }
};

export const publishDiceValue = async (
  gameId: string,
  characterId: string,
  diceValue: number,
): Promise<void> => {
  console.log(`game:111:diceRolled`);
  await redisPublisher.publish(
    // `game:111:diceRolled`,
    `game:${gameId}:diceRolled`,
    JSON.stringify({ characterId, value: diceValue }),
  );
};
