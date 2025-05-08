import { Request, Response } from "express";
import * as diceRollService from "../services/diceRollService";
import { getGameState } from "../daos/game-state-redis";

export const getLiveGameState = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;

    const gameState = await getGameState(gameId);
    res.status(200).send(gameState);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
