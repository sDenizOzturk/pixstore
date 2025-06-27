import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { getPlayer } from "../controllers/player";

export const playerRouter = Router();

playerRouter.get("/:id", requireAuth, getPlayer);
