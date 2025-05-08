import { rollDice } from "../logic/dice";
import {
  getGameState,
  publishDiceValue,
  setGameState,
} from "../daos/game-state-redis";

export const rollDiceForCharacter = async (
  gameId: string,
  characterId: string,
) => {
  const gameState = await getGameState(gameId);
  const diceValue = rollDice();
  const diceRolls = {
    ...gameState.diceRolls,
    [characterId]: { value: diceValue },
  };
  const updatedGameState = {
    ...gameState,
    diceRolls,
  };
  await setGameState(gameId, updatedGameState);
  await publishDiceValue(gameId, characterId, diceValue);
  return updatedGameState;
};
