isAuthenticated=(req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }//end of if
    else{
        res.redirect('/users/login')
    }//end of else
}//end of function 

module.exports=isAuthenticated