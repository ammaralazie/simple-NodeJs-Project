const express = require("express");
const app = express();

//import for passport and passport-setup model
const passport = require("passport");
const passportSetup = require("./config/passport-setup");

//import session and flash
var session = require("express-session");
const flash = require("connect-flash");

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
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));

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

//section initializationn and session for passport
app.use(passport.initialize());
app.use(passport.session());

//get user from session then login or registeration
app.get('*',(req,res,next)=>{
  //اهنا يعني عند حدوث اي طلب يروح يدور على يوزر بالسشن اذا لكاه انخزن عندي تحت اسم يوزر وذا لا راح يرجع  نلل
  res.locals.user=req.user || null
  //نيكست تعني انو كمل الطلب الي جايني
  next()
})

//to add formt date in template ejs
const moment = require("moment");
app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
  });

//import to route file and use it
router = require("./routes/route");
app.use("/events", router);


//import user-router and use it
user_router = require("./routes/user-router");
app.use("/users", user_router);

//make listen
app.listen(3000, () => {
  console.log("server is working");
});
