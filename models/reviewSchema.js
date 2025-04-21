import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product information is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User information is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
});

export default mongoose.model("Review", ReviewSchema);
