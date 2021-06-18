"use strict";

const myConnection = require("./db/db_conn");

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  router = require('./routes/index'),
  mysql = require("mysql"),
  session = require("express-session"),
  MySQLStore = require("express-mysql-session")(session);

app.set("port", process.env.PORT || 3003);

app.set("view engine", "ejs");
app.use(express.static( __dirname+'/public'));

//app.set("views", __dirname + '/views');

app.use('/', express.static(__dirname + '/www')); // redirect root 
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS

app.set("layout", "layout")
app.set("layout extractScripts", true);
app.use(layouts);

//mysql
var sessionStore = new MySQLStore(myConnection.options);
app.use(
  session({
    key: "testkey",
    secret: "secret code",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

var connection = myConnection.connection();
myConnection.init(connection);
var sessionStore = new MySQLStore({}, connection);

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  res.locals.loggedIn = req.session.userId;
  next();
});

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
