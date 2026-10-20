import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  } | undefined;
}

export const db = async () => {
  const uri = process.env.MONGODB_URI_LOCAL;
  if (!uri) throw new Error("MONGODB_URI_LOCAL is not set");

  if (globalThis.mongoose?.conn) {
    return globalThis.mongoose.conn;
  }

  if (!globalThis.mongoose) {
    globalThis.mongoose = { conn: null, promise: null };
  }

  if (!globalThis.mongoose.promise) {
    globalThis.mongoose.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  }

  try {
    globalThis.mongoose.conn = await globalThis.mongoose.promise;
    console.log("Database connected ✅");
    return globalThis.mongoose.conn;
  } catch (error: any) {
    globalThis.mongoose.promise = null;
    throw new Error(`DB connection failed: ${error.message}`);
  }
};

