const express=require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { UserModal } = require('../../modals/userModal')

const userRegisterRouter=express.Router()

userRegisterRouter.post('/',async(req,res)=>{
    const {name,email,password,isAdmin}=req.body
    try {
        bcrypt.hash(password, saltRounds, async(err, hash)=> {
            if(!err){

                const user=new UserModal({name,email,password:hash,isAdmin})
                await user.save()
                res.send({message:'registration success'})
            }else{
                res.send({message:"error while hashing"})
            }
        });

    } catch (err) {
        console.log(err)
        res.send({message:'error while registring',error:err})
    }

})

module.exports={
    userRegisterRouter
}