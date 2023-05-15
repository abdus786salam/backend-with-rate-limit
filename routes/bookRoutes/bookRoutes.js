const express=require('express')
const { BookModal } = require('../../modals/bookModal')
const { adminauthentication } = require('../../middlewares/authentication')

const bookRouter=express.Router()

bookRouter.get('/',async(req,res)=>{
    const query=req.query
    // console.log(query)
    if(query){

        try {
            let books= await BookModal.find({...query})
            // console.log(books)
            res.send({data:books,count:books.length})
        } catch (err) {
            console.log(err)
            res.send({err})
        }
    }else{
        try {
            let books= await BookModal.find()
            // console.log(books)
            res.send({data:books,count:books.length})
        } catch (err) {
            console.log(err)
            res.send({err})
        }
    }
})

bookRouter.get('/:id',async(req,res)=>{
    let {id}=req.params
    // console.log(id)
    try {
        let books= await BookModal.find({_id:id})
        // console.log(books)
        res.send({data:books,count:books.length})
    } catch (err) {
        console.log(err)
        res.send({err})
    }
})

bookRouter.patch('/:id',adminauthentication,async(req,res)=>{
    let {id}=req.params
    let data=req.body
    // console.log(id)
    if(id){
        try {
            let books= await BookModal.findByIdAndUpdate({_id:id},data,{new:true})
            // console.log(books)
            res.send({message:'update successful',data:books,count:books.length})
        } catch (err) {
            console.log(err)
            res.send({err})
        }
    }else{
        res.send({message:'provide id of the book'})
    } 
})
bookRouter.put('/:id',adminauthentication,async(req,res)=>{
    let {id}=req.params
    let data=req.body
    // console.log(id)
    if(id){
        try {
            let books= await BookModal.findByIdAndUpdate({_id:id},data,{new:true})
            // console.log(books)
            res.send({message:'update successful',data:books,count:books.length})
        } catch (err) {
            console.log(err)
            res.send({err})
        }
    }else{
        res.send({message:'provide id of the book'})
    } 
})
bookRouter.delete('/:id',adminauthentication,async(req,res)=>{
    let {id}=req.params
    // console.log(id)
    if(id){
        try {
             await BookModal.findByIdAndDelete({_id:id})
            res.send({message:'deleted successfully'})
        } catch (err) {
            console.log(err)
            res.send({err})
        }
    }else{
        res.send({message:'provide id of the book'})
    } 
})


bookRouter.post('/',adminauthentication,async(req,res)=>{
    const book=req.body
    // console.log(book)
    try {
        if(book){

            let books= new BookModal(book)
            await books.save()
            res.send({message:"book posted successfully"})
        }
    } catch (err) {
        console.log(err)
        res.send({message:"error while posting book details",err})
    }
})

module.exports={
    bookRouter
}