const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    user : { type: mongoose.Types.ObjectId, ref: 'User' },
    books : [{ type: mongoose.Types.ObjectId, ref: 'Book' }],
    totalAmount: Number
})


const OrderModal=mongoose.model('Order',orderSchema)

module.exports={
    OrderModal
}