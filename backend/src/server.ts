import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/connectDB";

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
