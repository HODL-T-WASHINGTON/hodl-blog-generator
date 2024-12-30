const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const postRouter = require("./router/postRouter");
const app = express();

//-----Connect DB------
// ***Replace the URL below with the URL for your database***
mongoose
  .connect("mongodb+srv://URL FOR YOUR DATABASE")
  .then(() => {
    console.log("DB has been connected");
  })
  .catch((e) => {
    console.log(e);
  });



const PORT = 3000;
//!Configure ejs
app.set("view engine", "ejs");
//!Middlewares
app.use(express.urlencoded({ extended: true }));

// Method override middleware
app.use(methodOverride("_method"));

//!. Show Homepage
app.get("/", (req, res) => {
  res.render("index");
});

//!---Router----
app.use("/", postRouter);

//Start the server
app.listen(PORT, console.log(`The server is running on port ${PORT}`));