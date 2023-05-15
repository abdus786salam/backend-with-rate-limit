const express=require('express')
const bcrypt = require('bcrypt');
const jwt=require('json-web-token')
const saltRounds = 10;
const { UserModal } = require('../../modals/userModal')

const userLoginRouter=express.Router()

userLoginRouter.post('/',async(req,res)=>{
    const {email,password}=req.body

    try {
        if(email&&password){
            const userDetails=await UserModal.find({"email":email})
            // console.log(userDetails)
            if(userDetails){
                bcrypt.compare(password, userDetails[0].password, function(err, result) {
                    if(err){
                     res.send({message:"wrong credailtial"})
                    }
                    if(result){
                        jwt.encode("masai", userDetails[0], (err, token) =>{
                            if(token){
                                res.send({token})
                            }
                        })
                    }
                 });
            }else{
                res.send({message:"wrong credailtial"})
            }
            
        }else{
            res.send('Please register or check your credential')
        }
        

    } catch (err) {
        console.log(err)
        res.send({message:'error while registring',error:err})
    }

})

module.exports={
    userLoginRouter
}