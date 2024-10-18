const req = require('express/lib/request');
const jwt = require('jsonwebtoken');

async function login(req ,res){
   const {username , password} = req.body ;

   if(!username){
    return res.json({msg : "Please Provide your name"}) ;
   }
   if(!password){
    return res.json({msg : "Please Provide Password"}) ;
   }
   const id = new Date().getDate() ;
   
// payload , secretkey , optional
   const token = jwt.sign({id , username} , process.env.SECRET_KEY , {expiresIn : '30d'}) ;
   res.json({msg : "User Created" , token})
}

const dashboard = async (req , res)=>{
  
   const luckyNumber = Math.floor((Math.random()*100)) ;
   res.status(200).json({msg : `Hello ${req.user.username}` , secret : `Your lucky Number is ${luckyNumber}`}) ;
}
module.exports = {login , dashboard} ; 