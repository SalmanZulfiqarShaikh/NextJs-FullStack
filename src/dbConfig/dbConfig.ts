import mongoose from "mongoose";

export async function connecttoDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Something went wrong connecting to MongoDB");
    console.log(error);

    throw error;
  }
}