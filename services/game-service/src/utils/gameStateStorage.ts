import redisClient from '../redisClient.js';
import { GameState } from '../types/gameState.js';

const getRedisKey = (gameId: string) => `game:${gameId}`;

export const saveGameState = async (gameId: string, state: GameState): Promise<void> => {
    const key = getRedisKey(gameId);
    await redisClient.set(key, JSON.stringify(state));
};

export const getGameState = async (gameId: string): Promise<GameState | null> => {
    const key = getRedisKey(gameId);
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

// USAGE
// const gameState = await getGameState(gameId);
// gameState.currentTurn = 'char2';
// await saveGameState(gameId, gameState);