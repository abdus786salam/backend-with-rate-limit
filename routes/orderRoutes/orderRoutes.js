const express=require('express')
const { OrderModal } = require('../../modals/orderModal')
const { authentication,adminauthentication } = require('../../middlewares/authentication')

const orderRouter=express.Router()

orderRouter.get('/',authentication,async(req,res)=>{
    const {user}=req.body
    // console.log(user)
    if(user){
        try {
            let orders=await OrderModal.find({user:user})
            res.send(orders)
        } catch (err) {
            console.log(err)
            res.send({message:"please try again",err})
        }
    }else{
        res.send({message:"please login frist"})
    }
})
orderRouter.post('/',[authentication,adminauthentication],async(req,res)=>{
    const data=req.body
    if(user){
        try {
            let orders=new OrderModal(data)

           await orders.save()
            res.send({message:"order placed successfully"})
        } catch (err) {
            console.log(err)
            res.send({message:"please try again",err})
        }
    }else{
        res.send({message:"please login frist"})
    }
})

module.exports={
    orderRouter
}
