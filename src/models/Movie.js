import mongoose from "mongoose"

const MovieSchema = new mongoose.Schema ({
    title:{
        type: String,
        required: true,
        maxlength: 20,
        unique: true,
    },
    director:{
        type: String,
        required: true,
    },
    genre:{
        type: String,
        required: true,
    },
    releaseYear:{
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },

}, { timestamps:true });

export default mongoose.model("Movie", MovieSchema)