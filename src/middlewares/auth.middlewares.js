import jwt from "jsonwebtoken"

export function authenticate(req, res, next){
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if(!token)
        return res.status(401).json({message: "Unauthorized"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token, try again..."})
    }
};

export async function isAdmin (req, res, next) {
    if (!req.user)
        return res.status(401).json({message: "Not authorized"})
    if (req.user.role !== "admin") {
        return res
        .status(401)
        .json({message: "Unauthorized! Admin privileges only..."})
    }
    next();
    
};