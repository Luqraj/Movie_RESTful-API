import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);