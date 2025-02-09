require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const recipeRoute = require("./routes/recipes");
const userRoute = require("./routes/user");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//routes

app.use("/api/recipes", recipeRoute);
app.use("/api/user", userRoute);

//connection to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to database and listening to port " + process.env.PORT
      );
      console.log(
        "Connected to database:",
        mongoose.connection.db.databaseName
      );
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
