const express = require('express')
const cors=require('cors')
const { connection } = require('./config/db')
const { userRegisterRouter } = require('./routes/userRoutes/userRegisterRoute')
const { userLoginRouter } = require('./routes/userRoutes/userLoginRoute')
const { bookRouter } = require('./routes/bookRoutes/bookRoutes')
const { orderRouter } = require('./routes/orderRoutes/orderRoutes')
const { rateLimitMiddleware } = require('./middlewares/rateLimitMiddleware')
require('dotenv').config()
const app =express()

app.use(express.json())
app.use(cors())
app.use(rateLimitMiddleware)
app.use('/api/register',userRegisterRouter)
app.use('/api/login',userLoginRouter)
app.use('/api/books',bookRouter)
app.use('/api/orders',orderRouter)
app.get('/api',(req,res)=>{
    res.send('welcome to books database')
})

app.listen(process.env.PORT,async()=>{

try {
    await connection
    console.log('connected with db')
} catch (err) {
    console.log(err)
}

console.log(`app running at http://localhost:${process.env.PORT}`)

})