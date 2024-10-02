import { Router } from "express";
import { createTeam, getTeam, getTeamById, updateTeam, removeMember } from "./team.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/", isAuth, createTeam);
router.get("/", isAuth, getTeam);
router.get("/:id", isAuth, getTeamById);
router.put("/", isAuth, updateTeam);
router.post("/remove-member", isAuth, removeMember);
export default router;