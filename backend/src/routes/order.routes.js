import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  create,
  getMine,
} from "../controllers/order.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", create);

router.get("/", getMine);

export default router;