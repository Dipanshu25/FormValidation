import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import post from "./routes/post.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/default", (req, res, next) => {
  console.log("the req obj --- ", req);
  res.json({
    data: "Hello World",
  });
});

app.use("/post", post);

const CONNECTION_URL =
  "mongodb+srv://jsbegin:13985781@cluster0.ft6mj.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5007;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
