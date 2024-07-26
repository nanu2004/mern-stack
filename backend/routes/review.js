import express from "express";
import Review from "../models/review.js";
import { VerifyToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post("/add", VerifyToken, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const review = new Review({
      productId,
      userId: req.user.userId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json({ success: true, message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate("userId", "firstname lastname");
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", VerifyToken, async (req, res) => {
  try {
    const reviews = await Review.find().populate("userId", "firstname lastname");
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:reviewId", VerifyToken, isAdmin, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (review.userId.toString() !== req.user.userId && req.user.role !== 1) {
      return res.status(403).json({ success: false, message: "Not authorized to update this review" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();
    res.status(200).json({ success: true, message: "Review updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:reviewId", VerifyToken, isAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (review.userId.toString() !== req.user.userId && req.user.role !== 1) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
