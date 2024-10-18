const req = require('express/lib/request');
const jwt = require('jsonwebtoken') ;

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
  
   const authHeader =  req.headers.authorization ;
   
   // check whether token is established or not ; 

   if(!authHeader || !authHeader.startsWith('Bearer') ){
      return res.status(401).json({msg : "No token Provided  "})
   }

   // splitting the token on space and select 2nd element of array 

   const token = authHeader.split(' ')[1] 
    
   // verifying the token whether token is same or not

   try {
   
      const decoded = jwt.verify(token , process.env.SECRET_KEY)
    const luckyNumber = Math.floor((Math.random()*100)) ;
    res.status(200).json({msg : `Hello ${decoded.username}` , secret : `Your lucky Number is ${luckyNumber}`}) ;
   
   } catch (error) {

      return res.status(200).json({msg : "Not authorized to acess this route"})
      
}
}
module.exports = {login , dashboard} ; 