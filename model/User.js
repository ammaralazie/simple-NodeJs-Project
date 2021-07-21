const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs')
const users=mongoose.Schema({
    username:{
        type:String,
        required:true
    }
    ,password:{
        type:String,
        required:true
    }

    ,email:{
        type:String,
        required:true
    }
})
users.methods.hashPassword=(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
//اهنا سوينة هاش باسورد لي تشفير الباسورد الى عشرة احرف وتستخدم مع التسجل

users.methods.comparePasswords=(password,hash)=>{
    return bcrypt.compareSync(password,hash)
}
//هاي الفكشن تستخد لي المقارنة بين الباسورد الي جايني مع طلب و الباسورد المخزون عندي 
//في حالة المطابقة يرجع ترو وفي حالة عدم المطابقة يرجع فلس
//تستخدم مع تسجيل الدخول

User=mongoose.model('User',users,'users')

module.exports=User