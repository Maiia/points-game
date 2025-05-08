import { Request, Response } from "express";
import * as diceRollService from "../services/diceRollService";

export const rollUserDice = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const { characterId } = req.body;

    if (typeof gameId !== "string") {
      res.status(400).json({ message: "Wrong Game Id" });
      return;
    }

    if (!characterId || typeof characterId !== "string") {
      res.status(400).json({ message: "Wrong Character Id" });
      return;
    }

    const updatedGame = await diceRollService.rollDiceForCharacter(
      gameId,
      characterId,
    );
    res.status(200).send(updatedGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
