import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/test");
        console.log(" Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}

export default connectDB;
