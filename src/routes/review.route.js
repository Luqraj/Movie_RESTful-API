import express from "express"

import {
    addMovieReview,
    getMovieReviews,
    deleteMovieReview,
} from "../controllers/review.controllers.js"

import { authenticate, isAdmin } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route("/movies/:movieId/reviews").post(authenticate, addMovieReview).get(authenticate, getMovieReviews);
router.delete("/movies/:movieId/reviews/:reviewId", authenticate, isAdmin, deleteMovieReview)

export {router as reviewRouter}