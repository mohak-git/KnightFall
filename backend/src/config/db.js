import mongoose from "mongoose";

const DBConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`);
        console.log(`MongoDB Connected @ ${connectionInstance.connection.host}:${connectionInstance.connection.port}`);
    } catch (error) {
        console.error("Error connecting to MongoDB.\n", error.message);
        process.exit(1);
    }
};

export default DBConnection;
