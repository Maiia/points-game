import { Router } from "express";
import { rollUserDice } from "../controllers/diceRollController";

const router = Router();

router.post("/game/:gameId", rollUserDice);

export default router;
