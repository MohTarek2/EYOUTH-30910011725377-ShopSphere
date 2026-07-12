import express from "express";
import { validateRegister } from "../middleware/validation.middleware.js";

import {
  register,
  login,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateRegister, register);

router.post("/login", login);

export default router;