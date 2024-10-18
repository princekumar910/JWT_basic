const jwt = require('jsonwebtoken') ;


async function authenticationMiddleware(req ,res , next){
    
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
    const {id , username } = decoded ;
    console.log(decoded) ;

    req.user = {id , username};
   
    next();
   } catch (error) {

      return res.status(200).json({msg : "Not access Without Token", secret : `Unknown` })
      
}

}


module.exports = {authenticationMiddleware}