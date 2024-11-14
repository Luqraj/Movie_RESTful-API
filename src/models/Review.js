import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema ({
    reviewerName:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema)