require("dotenv").config();
const fs = require("node:fs");
const sass = require("sass");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// compile sass
try {
  const styleFilePath = __dirname + "/public/styles.css";
  const style = sass.compile(__dirname + "/scss/main.scss");
  fs.writeFileSync(styleFilePath, style.css.toString());
  console.log("The file " + styleFilePath + " was created successfully.");
} catch (err) {
  console.error(err);
  console.error("\nThere was an error while compiling sass into css.");
}

// middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

function getAppRoutes() {
  // routes
  app.get("*", checkUser);
  app.get("/", (req, res) => res.render("landing-page"));
  app.get("/", requireAuth, (req, res) => res.render("home"));
  app.get("/myProfile", requireAuth, (req, res) => res.render("myProfile"));
  app.use(authRoutes);
}

function getErrorRoutes() {
  app.get("/", (req, res) => res.render("landing-page"));

  app.use((req, res) => {
    res.status(500).render("error");
  });
}

const PORT = process.env.PORT || 3000;

const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT);
    console.log(`Listening on port ` + PORT);

    getAppRoutes();
  })
  .catch((err) => {
    console.log(err);
    app.listen(PORT);
    console.log(`Listening on port ` + PORT);

    getErrorRoutes();
  });

module.exports = app;
