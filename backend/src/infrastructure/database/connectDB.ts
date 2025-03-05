import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    throw new Error("DB_URL is not defined in the environment variables.");
  }

  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected for MindUp");
  } catch (err: any) {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  }
};
