import express from "express"
import {
    getMovie,
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie,
} from "../controllers/movie.controllers.js"

import { authenticate, isAdmin } from "../middlewares/auth.middlewares.js";

const router = express.Router();
// const admin = [authenticate, isAdmin]

router.post("/", authenticate, isAdmin, createMovie);
router.get("/all", authenticate, getAllMovies);
router.route("/:id").get(authenticate, getMovie).patch(authenticate, isAdmin, updateMovie).delete(authenticate, isAdmin, deleteMovie);

export {router as movieRouter};