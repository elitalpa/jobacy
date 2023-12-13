require("dotenv").config();
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
  })
  .catch((err) => {
    app.listen(PORT);
    console.log(`Listening on port ` + PORT);
    console.log(err);
    app.get("*", (req, res) => res.redirect("/error"));
  });

// error page when DB is not connected
app.get("/error", (req, res) => {
  res.render("error");
});

// routes
app.get("*", checkUser);
app.get("/", requireAuth, (req, res) => res.render("home"));
app.get("/myProfile", requireAuth, (req, res) => res.render("myProfile"));
app.use(authRoutes);

module.exports = app;
