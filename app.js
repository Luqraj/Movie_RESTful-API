import express, { urlencoded } from "express"
import { connectDB } from "./src/config/db.js"
import { movieRouter } from "./src/routes/movie.route.js";
import { authRouter } from "./src/routes/auth.route.js";
import { reviewRouter } from "./src/routes/review.route.js";

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", reviewRouter);


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
});