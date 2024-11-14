import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {
    try {
        const {username, password, role} = req.body;
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({message: "Username taken, please specify another username..."})};

        if(!username || !password)
            return res.status(401).json({message: "Please provide both fields to proceed..."});

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt)

        const newUser = User.create({
            username,
            role,
            password:hash,
        });
        res.status(201).json({message: "Registration successful, please proceed to login...", newUser})

    } catch (error) {
        console.error();
        res.status(500).json({error});
    }
};

export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body

        const {user} = await User.findOne({ username })
        if(!user) {
            return res.status(400).json({error: "User not found!"})
        };

        const {isPassword} = await bcrypt.compare(password, user.password)
        if(!isPassword) {
            return res.status(400).json({error: "Invalid password"})
        };
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_LIFETIME,
            {
                expiresIn: process.env.JWT_LIFETIME,
            }
        )
        res.status(200).json({message: "Login successful", token})

    } catch (error) {
        console.error();
        res.status(500).json({error});
        
        
    };
};