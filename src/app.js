const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");

const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

// get routes, controllers, and handlebars helpers
const routes = require("./routes/index");
const controllers = require("./controllers/index");
const helpers = require("./views/helpers/index");

const app = express();

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static assets
app.use(favicon(path.join(__dirname, "..", "public", "img/favicon.ico")));
app.use(express.static(path.join(__dirname, "..", "public"), { maxAge: "30d" }));

// login/out buttons
app.use((req, res, next) => {
  status = controllers.loginButtons(req);
  next();
});

// handlebars setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main",
    helpers: helpers
  })
);

app.set("port", process.env.PORT || 7119);

app.use(routes);



module.exports = app;
