import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import projectRoutes from "./project/project.route.js";
import taskRoutes from "./task/task.route.js";
import authRoutes from "./auth/auth.route.js";
import userRoutes from "./user/user.route.js";
import teamRoutes from "./team/team.route.js";

dotenv.config();

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    process.exit(1);
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/teams", teamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
