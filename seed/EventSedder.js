const db=require('../config/db')
const Event=require('../model/Event')

eventSchema=[
    new Event({
        name:'ammar',
        location:'baghdad',
        phone:0222222,
        date:new Date(),
    }),
    new Event({
        name:'abbas',
        location:'dyiala',
        phone:0222222,
        date:new Date(),
    }),
    new Event({
        name:'hamaz',
        location:'baghdad',
        phone:0222222,
        date:new Date(),
    }),
    new Event({
        name:'muhsen',
        location:'baghdad',
        phone:0222222,
        date:new Date(),
    }),
    new Event({
        name:'naser',
        location:'baghdad',
        phone:0222222,
        date:new Date(),
    })
]
eventSchema.forEach((obj)=>{
    
    obj.save((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('data was save successfly')
    }
})
})

