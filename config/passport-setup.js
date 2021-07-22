const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/User");

//هذني هن الخطوات الرىيسية

//seralization and de seralization for user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
//تقوم بخزن اليوزر ايدي في سيشن
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
//تستخدم لي سحب اليوزر من سشن بواسطة اليوزر ايدي

//انشاء لوكل استراتيجيز الي اسمهة loacl signup
passport.use(
  "local.signup",
  new localStrategy(
    {
      //اهنا في حالة انريد اتسجل بواسطة فرضا يميل يمكن تغييرها من الحالة الافتراضية الي هو اليوزرنيم الى الايميل
      //this email and password will come from requset
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      //سوينا هاي الخطوة حتى نكدر نحصل على الباسورد والايميل من فوك الى الفكشن الجوة ومعالجة الطلب
    },
    (req, username, password, done) => {
      if (req.body.password != req.body.confrim_password) {
        return done(null, false, req.flash("error", "password do not match"));
      } //end of if
      else {
        User.findOne({ email: username }, (err, user) => {
          if (err) {
            console.log(err);
          } else if (user) {
            return done(null, false, req.flash("error", "email is exists"));
          } else if (!user) {
            User.findOne({ username: req.body.username }, (err, user) => {
              if (err) {
                console.log(err);
              } else if (user) {
                return done(
                  null,
                  false,
                  req.flash("error", "username is exists")
                );
              }
              if (!user) {
                const newUser = new User();
                newUser.username = req.body.username;
                newUser.email = req.body.email;
                newUser.password = newUser.hashPassword(req.body.password);
                newUser.avater='profile.png';
                newUser.created_at=new Date()
                newUser.save((err, user) => {
                  if (!err) {
                    return done(
                      null,
                      user,
                      req.flash("userSuccess", "user was adedd")
                    );
                  } else {
                    console.log(err);
                  }
                });
              }
            });
          }
        });
      }
    }
  )
);
//end  of local.signup

passport.use(
  "local.login",
  new localStrategy(
    {
      usernameField:'email',
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      //login by username or eamil
        var typee=(req.body.email.indexOf('@') === -1) ? 'username' :'email'
            if(typee=='username'){
              User.findOne({username:username}, function(err,user){
             
                if(err){
                    return done(null,false,req.flash('error','something is happend plase try agin'))
                }else if(!user){
                    console.log(user)
                    return done(null,false,req.flash('error','this username is not registered'))
                }else if(user){
                  if( user.comparePasswords(password,user.password)){
                    return done(null,user,req.flash('success','user is authenticated'))
                  }else{
                    return done(null,false,req.flash('error','this password is incorrect'))
                  }
                }//end of elseif user
            });//end of quary
            }//end if of  typee
            else{
              User.findOne({email:username}, function(err,user){
                if(err){
                    return done(null,false,req.flash('error','something is happend plase try agin'))
                }else if(!user){
                    return done(null,false,req.flash('error','this email is not registered'))
                }else if(user){
                  if( user.comparePasswords(password,user.password)){
                    return done(null,user,req.flash('success','user is autherization'))
                  }else{
                    return done(null,false,req.flash('error','this password is incorrect'))
                  }
                }//end of elseif user
            });//end of quary
            }//end else of typee
    }
  )
);
//end of local.signup
