import express from "express";

import protect from "../middleware/auth.middleware.js";

import { profile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", protect, profile);

export default router;