const express =require("express")
const mongoose =require('mongoose')
const dotenv=require('dotenv/config')

const app=express();
app.use(express.json())

const userRoute=require('./routes/auth')
app.use('/api/users/',userRoute);


app.get('/',(req,res)=>{
    res.send("Hello")
})

app.get('/index',(req,res)=>{
    res.send("you are in the index page")
})




mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("connected")
})

app.listen(3000,()=>{
    console.log("Server Listening")
})