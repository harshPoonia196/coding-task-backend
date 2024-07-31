import express from "express";
import { connectDB } from "./config";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
