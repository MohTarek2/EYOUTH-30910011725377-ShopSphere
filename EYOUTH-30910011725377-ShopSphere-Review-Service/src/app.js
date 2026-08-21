import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/prisma.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Review Service Running" });
});

// GET /api/reviews/:productId - list reviews for a specific product
app.get("/api/reviews/:productId", async (req, res, next) => {
  try {
    const productId = parseInt(req.params.productId, 10);

    if (Number.isNaN(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, reviews });
  } catch (err) {
    next(err);
  }
});

// POST /api/reviews - create a new review for a product
app.post("/api/reviews", async (req, res, next) => {
  try {
    const { productId, reviewerName, rating, comment } = req.body;

    if (!productId || !reviewerName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "productId, reviewerName, rating and comment are required",
      });
    }

    const review = await prisma.review.create({
      data: {
        productId: parseInt(productId, 10),
        reviewerName,
        rating: parseInt(rating, 10),
        comment,
      },
    });

    res.status(201).json({ success: true, review });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
