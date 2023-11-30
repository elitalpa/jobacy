const fs = require("node:fs");
const express = require("express");
const sass = require("sass");
// const routes = require("./routes/routes");

const app = express();

// compile sass
try {
  const styleFilePath = "public/style.css";
  const style = sass.compile("scss/style.scss");
  fs.writeFileSync(styleFilePath, style.css.toString());
  console.log("The file " + styleFilePath + " was created successfully.");
} catch (err) {
  console.error(err);
  console.error("\nThere was an error while compiling sass into css.");
}

// middleware
app.use(express.static("public"));
app.use(express.json());

// view engine
app.set("view engine", "ejs");

const port = 3000;
app.listen(port);

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/dashboard", (req, res) => res.render("dashboard"));

// app.use(routes);

// error custom
app.use((req, res) => {
  res.status(404).render("404");
});
