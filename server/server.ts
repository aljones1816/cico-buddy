import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT || 5100;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI ?? "";

mongoose.set('debug', true);
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//mport userlogRouter from "./routes/userlog";
import { usersRouter } from "./routes/users.ts";

app.get("/", function (req, res) {
  console.log(req);
  res.send("Hello World!");
});

app.use("/users", usersRouter);
//app.use("/userlog", userlogRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
