import express from "express";
import colors from "colors"
import morgan from "morgan";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRoutes);


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `le serveur est connecté à la ${process.env.PORT}`
      .bgCyan.white
  );
});
