import express from "express";
import { login, me, register } from "../controllers/auth.controllers";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);

export default router;
