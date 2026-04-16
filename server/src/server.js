import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { seedAdmin } from "./controllers/authController.js";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
