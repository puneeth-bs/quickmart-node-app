import express from "express";
import { createReview, getProductReviews } from "../controllers/reviewController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Create review
router.post("/:product", isAuthenticated, createReview);

// Get all reviews for a product
router.get("/:product", isAuthenticated, getProductReviews);

export default router;
