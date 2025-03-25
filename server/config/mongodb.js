import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("Database connected successfully"))
    mongoose.connection.on("error", () => console.log("An error occured while connecting to the database"));
    
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`)
}

export default connectDB;