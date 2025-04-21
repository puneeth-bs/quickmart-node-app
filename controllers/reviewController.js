import Review from "../models/reviewSchema.js";
import Product from "../models/productSchema.js";

// Create a review
export const createReview = async (req, res) => {
  try {
    const { product } = req.params;
    const { rating, comment } = req.body;
    const user = req.user?.id || req.body.user; // supports either middleware auth or explicit user

    // Optional: check if the product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Optional: prevent duplicate reviews
    const existing = await Review.findOne({ product, user });
    if (existing) {
      return res.status(400).json({ message: "You already reviewed this product" });
    }

    const newReview = await Review.create({
      product,
      user,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review submitted successfully"});
  } catch (error) {
    console.error("Create Review Error:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
};

// Get all reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { product } = req.params;

    const reviews = await Review.find({ product })
      .populate("user", "name") // show user name only
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
