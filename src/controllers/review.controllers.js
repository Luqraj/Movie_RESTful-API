import Review from "../models/Review.js"
import Movie from "../models/Movie.js"

export const addMovieReview = async (req, res) => {
    try {
        const {movieId} = req.params;
        const review = await Review.create(req.body);
        await Movie.findByIdAndUpdate(movieId, { $push: {reviews: review._id } }, { new: true});
        res.status(201).json({message: "Review added successfully", review});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const getMovieReviews = async (req, res) => {
    try {
        const {movieId} = req.params;
        const movie = await Movie.findById(movieId).populate("reviews");
        if (!movie) return res.status(404).json({message: "Movie not found"});
            res.status(200).json(movie.review);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const deleteMovieReview = async (req, res) => {
    try {
        const {movieId, reviewId } = req.params;
        const review = await Review.findByIdAndDelete(reviewId);
        if(!review) return res.status(404).json({message: "Review not found" });
        await Movie.findByIdAndUpdate(movieId, {$pull: {reviews: reviewId }});
        res.status(200).json({message: "Review deleted successfully"}); 
      } catch (error) {
        res.status(500).json({error: error.message});
      }
};