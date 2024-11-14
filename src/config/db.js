import mongoose from "mongoose";

export const connectDB = async () => {
    
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected: ${connect.connection.host}`);
        
        } catch (error) {
            console.error(`Error connecting to DB: ${ error }`);
            process.exit(1);

    } 
};

