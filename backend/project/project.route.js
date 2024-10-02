import express from "express";
import { createProject, updateProject, deleteProject, getProjects } from "./project.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", isAuth, createProject);
router.put("/:id", isAuth, updateProject);
router.delete("/:id", isAuth, deleteProject);
router.get("/", isAuth, getProjects);
export default router;