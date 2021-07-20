const express = require("express");
const Event = require("../model/Event");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const moment=require('moment')
moment().format()

//create user function redirect to create user page
router.get("/create", [], (req, res) => {
  res.render("event/create", {
    errors:  req.flash('errors'),
    
  });
});
//end of create user function

//save date when active action
router.post(
  "/create",
  [
    check("name", "name must be string and lenght at least 5 charctires")
      .isString()
      .isLength({ min: 5 }),
    check("location", "loction must be string and lenght at least 5 charctires")
      .isString()
      .isLength({ min: 3 }),
    check("phone", "phone must be number and lenght must be 11 number")
      .isString()
      .isLength({ min: 11, max: 11 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors',errors.array())
      res.redirect("/events/create");
    } else {
      if (req.body) {
        let newUser = new Event({
          name: req.body.name,
          location: req.body.location,
          phone: req.body.phone,
          date: req.body.date,
          created_at: new Date(),
        }); //end of Event
        // newUser.created_at=new Date()
        newUser.save((err) => {
          if (err) {
            console.log(err);
          } //end of if
        }); //end of save data

        req.flash('success','data was saved successfly')
        // console.log( newUser);

        res.redirect("/events");
      } //end of if
    } //end of if errors
  })
//end of save date when active action

router.get("/", (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.log(err);
    } else {
      context = {
        obj: events,
        success:req.flash('success')
      }; //end of context
      res.render("event/index.ejs", context);
    } //end of if
  });
}); //end of index

router.get("/:id", (req, res) => {
  Event.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      context = {
        obj: data,
        success:req.flash('success')
      }; //end of context
      res.render("event/show.ejs", context);
    } //end of if
  });
}); //end of show function

//edit section 
router.get('/edit/:id',(req,res)=>{
    const usr=Event.findOne({_id:req.params.id},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            // console.log(data)
           context={
               obj:data,
               date:moment(data.date).format('YYYY-MM-DD'),
               errors:  req.flash('errors'),
           } //end of context
           res.render('event/edit',context)
        }//end of if
    })
})
//end section of edit

//section update 
router.post('/update',[
    check("name", "name must be string and lenght at least 5 charctires")
      .isString()
      .isLength({ min: 5 }),
    check("location", "loction must be string and lenght at least 5 charctires")
      .isString()
      .isLength({ min: 3 }),
    check("phone", "phone must be number and lenght must be 11 number")
      .isString()
      .isLength({ min: 11, max: 11 }),
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('errors',errors.array())
        res.redirect('/events/edit/'+req.body.id)
    }else{
        let query={_id:req.body.id};
        let data={
            name: req.body.name,
            location: req.body.location,
            phone: req.body.phone,
            date: req.body.date,
        }
        Event.updateOne(query,data,(err)=>{
            if(!err){
                req.flash('success','data was updated successfly');
                res.redirect('/events/'+req.body.id);
            }else{
                console.log(err)
            }//end of if 
        }//end of function err
        )}//end of else
    })
//end of section update

//delete section
router.get('/delete/:id',(req,res)=>{
    const query={_id:req.params.id};
    Event.deleteOne(query,(err)=>{
        if(err){
            console.log(err)
        }else{
            res.json('ok');
        }//end of id
    })//end of event
    
})
//end of delete section

//export router
module.exports = router;
