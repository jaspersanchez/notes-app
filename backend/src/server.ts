import "dotenv/config";
import express from "express";
import { env } from "./utils/env";
import { logger } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";

import authRoutes from "./routes/auth.routes";
import connectDB from "./config/db";

const port = env.port;

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
