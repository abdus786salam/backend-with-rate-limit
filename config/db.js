const mongoose=require('mongoose')
require('dotenv').config()

const connection = mongoose.connect('mongodb+srv://salamee:masai@cluster0.haanewi.mongodb.net/bookstore?retryWrites=true&w=majority')

module.exports={
    connection
}