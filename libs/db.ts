import mongoose from "mongoose";

declare global {
  var database: any;
}

export const db = async () => {
  try {
    if (!global.database) {
      const sock = await mongoose.connect("mongodb://dbviewer:dbviewer@127.0.0.1:27017/flashdb?authSource=admin");
      global.database = sock;
      console.log("Database connected successfully");
    }
    return global.database;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

db();
