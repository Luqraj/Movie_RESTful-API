import Movie from "../models/Movie.js";

export const createMovie = async (req, res) => {
    try {
      const newMovie = await Movie.create(req.body);
      res.status(201).json({ data: newMovie, message: "Movie created..." });
      
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  export const getAllMovies = async (req, res) => {
    try {
      const {title, director, releaseYear } = req.query;
      const filter = {};
      if (title) {
        filter.title = { $regex: title, $options: "i" };
      } 
      if (director) {
        filter.director = { $regex: director, $options: "i" }
      }
      if (releaseYear) {
        filter.releaseYear = { $regex: releaseYear, $options: "i" };
      }
      const movies = await Movie.find(filter).populate("reviews");
      res.status(200).json({ data: movies, message: "retrieved..." });

    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  export const getMovie = async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id).populate("reviews");
      if (!movie) {
        return res
          .status(404)
          .json({ message: `Not found, try again...` });
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  export const updateMovie = async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      if (!movie) {
        return res
          .status(404)
          .json({ message: `Not found, try again...` });
      }
      res.status(200).json({ movie, message: "Movie updated successfully..." });

    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  export const deleteMovie = async (req, res) => {
    try {
      const movie = await Movie.findOneAndDelete({ _id: req.params.id });
  
      if (!movie) {
        return res
          .status(404)
          .json({ message: `Not found...` });
      }
      res.status(200).json({ movie, message: "Movie deleted successfully..." });

    } catch (error) {
      res.status(500).json({ message: error });
    }
  };