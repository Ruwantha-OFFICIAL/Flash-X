import mongoose from "mongoose";

declare global {
  var database: mongoose.Mongoose | undefined;
}

export const db = async () => {
  const uri = process.env.MONGODB_URI_LOCAL;
  if (!uri) throw new Error("MONGODB_URI environment variable is not set");

  if (global.database) return global.database;

  try {
    const sock = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    global.database = sock;
    console.log("Database connected");
    return global.database;
  } catch (error:any) {
    throw new Error(`DB connection failed: ${error instanceof Error ? error.message : error}`);
  }
};