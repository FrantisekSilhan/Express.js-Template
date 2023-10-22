const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");
const util = require('util');
// const db = require("./db/db");
// const crypto = require("crypto");
const fs = require("fs");
const config = require("./config");

if (!fs.existsSync(path.join(__dirname, "data"))) {
  fs.mkdirSync(path.join(__dirname, "data"));
}

app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

fs.readdirSync(path.join(__dirname, "routes")).forEach(file => {
  if (file.endsWith(".js")) {
      const route = require(util.format("./rutes/%s", file));
      app.use("/", route);
  }
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const errorCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  console.error(err);

  res.status(errorCode).render("error", { site: config.siteTitle, errorCode, errorMessage });
});

app.listen(6969);