import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { userRouter } from "./routes/user.ts";
import { userlogRouter } from "./routes/userlog.ts";

config();

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!!");
});

app.use("/api/user", userRouter);
app.use("/api/userlog", userlogRouter);

// open mongoDB connection
const uri = process.env.ATLAS_URI ?? "";
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to db and listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
