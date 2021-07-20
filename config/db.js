const mogoose=require('mongoose')

mogoose.connect('mongodb://localhost:27017/eventDB',{ useNewUrlParser: true,useUnifiedTopology: true },(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('data base connect successfly ...')
    }
})