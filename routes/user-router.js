const { localsName } = require("ejs");
const express = require("express");
const router = express.Router();
const passport = require("passport");

//this pakge used for delete file 
const fs=require('fs') 
//import for middlware
const isAuthenticated=require('../middlware/AuthMiddlware')
const upload=require('../middlware/UploadImagMiddlware')

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
router.get("/profile",isAuthenticated ,(req, res) => {
  res.render("user/profile");
});

//save image for user
router.post('/save-image',isAuthenticated,upload.single('avatar'),(req,res)=>{
User.findOne({_id:req.user._id},(err,user)=>{
  if(err){
    
    console.log(err)
  }else{
    if(user.avater !='profile.png'){
     
      fs.unlink('public/media/'+user.avater.filename, (err) => {
        if (err) console.log(err);
        console.log('public/media/'+user.avater.filename+ ' was deleted');
      });
    }//end of if to chack profile image
    user.avater=req.file
    user.save((err)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/users/profile')
      }
    })
    
  }//end of if
})
 
})

//get logout page
router.get("/logout", isAuthenticated,(req, res) => {
  req.logout()
  res.redirect('/users/login')
});

module.exports = router;
