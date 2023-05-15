const mongoose=require('mongoose')

const bookSchema=mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number
})


const BookModal=mongoose.model('Book',bookSchema)

module.exports={
    BookModal
}