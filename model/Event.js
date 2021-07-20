const mongoose=require('mongoose')
const Events=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    phone:{
        type:Number ,
        required:true
    },
    date:{
        type:Date  ,
        required:true
    },
    created_at:{
        type:Date
    }
})

let Event=mongoose.model('Event',Events,'users')

module.exports=Event