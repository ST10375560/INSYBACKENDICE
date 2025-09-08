import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI
 
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected to ${MONGO_URI}`);
    } catch (error) {
        console.error(`Failed to connect to MONGO_URI: ${err.message}`);
        console.log(`Attempting to connect to ATLAS_URI...`);
    }
};

export default connectDB;