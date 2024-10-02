import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "./task.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", isAuth, createTask);
router.get("/", isAuth, getTasks);
router.put("/:id", isAuth, updateTask);
router.delete("/:id", isAuth, deleteTask);

export default router;