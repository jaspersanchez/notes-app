import mongoose from "mongoose";
import { env } from "../utils/env";

const mongoURI = env.mongoUri;

const connectDB = async () => {
  await mongoose.connect(mongoURI);

  console.log("Connected to DB");
};

export default connectDB;
