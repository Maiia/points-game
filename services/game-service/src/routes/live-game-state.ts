import { Router } from "express";
import { getLiveGameState } from "../controllers/liveGameStateController";

const router = Router();

router.get("/:gameId", getLiveGameState);

export default router;
