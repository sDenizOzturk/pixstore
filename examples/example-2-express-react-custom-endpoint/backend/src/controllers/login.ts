// NOTE: This login controller is intentionally minimal and not production-grade.
// The design prioritizes simplicity and demonstrating Pixstore integration rather than security best practices.

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  getGeneralManagerById,
  getTeamById,
  getPlayerById,
  getFederationStaffById,
} from "../store/in-memory-db";
import { SECRET } from "../constants";

// Player login
export const loginAsPlayer = (req: Request, res: Response): void => {
  const { id } = req.body;
  const player = getPlayerById(id);
  if (!player) {
    res.status(404).json({ error: "Player not found" });
    return;
  }
  const token = jwt.sign(
    { id: player.id, userType: "basketballPlayer" },
    SECRET,
    { expiresIn: "2h" }
  );
  res.json({
    token,
    user: { id: player.id, userType: "basketballPlayer", name: player.name },
  });
};

// GM login
export const loginAsGM = (req: Request, res: Response) => {
  const { id } = req.body;
  const gm = getGeneralManagerById(id);
  if (!gm) {
    res.status(404).json({ error: "General Manager not found" });
    return;
  }
  const team = getTeamById(gm.teamId);
  const gmName = team ? `${team.teamName} GM` : "General Manager";

  const token = jwt.sign({ id: gm.id, userType: "generalManager" }, SECRET, {
    expiresIn: "2h",
  });
  res.json({
    token,
    user: { id: gm.id, userType: "generalManager", name: gmName },
  });
};

// Staff login
export const loginAsStaff = (req: Request, res: Response) => {
  const { id } = req.body;
  const staff = getFederationStaffById(id);
  if (!staff) {
    res.status(404).json({ error: "Federation staff not found" });
    return;
  }
  const token = jwt.sign(
    { id: staff.id, userType: "federationStaff" },
    SECRET,
    { expiresIn: "2h" }
  );
  res.json({
    token,
    user: {
      id: staff.id,
      userType: "federationStaff",
      name: "ANONYMOUS STAFF",
    },
  });
};
