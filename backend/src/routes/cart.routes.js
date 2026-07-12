import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  add,
  get,
  update,
  remove,
  clear,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.use(protect);

router.get("/", get);

router.post("/", add);

router.put("/:id", update);

router.delete("/:id", remove);

router.delete("/", clear);

export default router;