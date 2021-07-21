const express = require("express");
const router = express.Router();
const passport = require("passport");
//get login page
router.get("/login", (req, res) => {
  res.render("user/login", {
    error: req.flash("error"),
  });
});

//post login page
router.post(
  "/login",
  passport.authenticate("local.login", {
    // events فيحالى تسجيل بصورة صحيحة  يذهب الى
    successRedirect: "/users/profile",
    ///users/signup في حالة حدوث خطاء يذهب الى
    failureRedirect: "/users/login",
    //في حالة حدوث خطاء يرسل الخطاء في الفلاش
    failureFlash: true,
  })
);

//get signup page
router.get("/signup", (req, res) => {
  res.render("user/signup", {
    error: req.flash("error"),
  });
});

//post signup page
router.post(
  "/signup",
  passport.authenticate("local.signup", {
    // events فيحالى تسجيل بصورة صحيحة  يذهب الى
    successRedirect: "/users/profile",
    ///users/signup في حالة حدوث خطاء يذهب الى
    failureRedirect: "/users/signup",
    //في حالة حدوث خطاء يرسل الخطاء في الفلاش
    failureFlash: true,
  })
);

//get profile page
router.get("/profile", (req, res) => {
  res.render("user/profile");
});

//get logout page
router.get("/logout", (req, res) => {
  res.render("user/logout");
});

module.exports = router;
