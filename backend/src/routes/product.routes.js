import express from "express";
import upload from "../middleware/upload.middleware.js";
import { validateProduct } from "../middleware/validation.middleware.js";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/product.controller.js";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post(
  "/",
  protect,
  authorize("ADMIN"),
  upload.single("image"),
  validateProduct,
  create
);

router.put(
  "/:id",
  protect,
  authorize("ADMIN"),
  update
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  remove
);

export default router;