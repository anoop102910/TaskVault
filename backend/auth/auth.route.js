import { Router } from "express";
import { signin, signup } from "./auth.controller.js";
const router = Router();

router.post("/login", signin);
router.post("/register", signup);
export default router;