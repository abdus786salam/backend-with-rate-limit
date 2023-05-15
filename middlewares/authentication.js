const jwt = require('json-web-token');
const authentication=(req,res,next)=>{
    const token=req.headers.authorization
    // console.log(token)
    if(token){
        jwt.decode("masai", token, function (err, decodedPayload, decodedHeader) {
            if (err) {
              res.send('wrong credaintials')
            } else {
              console.log(decodedPayload, decodedHeader);
              req.body.user=decodedPayload._id
              next()
            }
          });
    }else{
        res.send({message:"please login frist"})
    }
    
}
const adminauthentication=(req,res,next)=>{
    const token=req.headers.authorization
    // console.log(token)
    if(token){
        jwt.decode("masai", token, function (err, decodedPayload, decodedHeader) {
            if (err) {
              res.send('wrong credaintials')
            } else {
              console.log(decodedPayload.isAdmin, decodedHeader);

             if(decodedPayload.isAdmin==true){

                 next()
             }else{
                res.send('you are not authorized')
             }
            }
          });
    }else{
        res.send({message:"please login frist"})
    }
    
}

module.exports={
    authentication,
    adminauthentication
}