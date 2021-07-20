const express = require("express");
const app = express();

//import session and flash
var session = require('express-session')
const flash=require('connect-flash')

//import body parser and use it
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to database
const db = require("./config/db");
// const seed=require('./seed/EventSedder')

//set template angine
app.set("view engine", "ejs");

//set static file
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+'/node_modules'))

//configration for session and flash
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAag: 60000 * 15 },
  })
);
app.use(flash());

//import to route file and use it
router = require("./routes/route");
app.use("/events", router);

//make listen
app.listen(3000, () => {
  console.log("server is working");
});
