const router =require('express').Router()
const User =require('../models/User')
const bcrypt =require('bcrypt')
const joi =require('@hapi/joi')
const {registervalidation, loginvalidation} =require('../validation')
const   JWT = require('jsonwebtoken')

router.get('/', (req,res)=>{
    res.send("You Have Entered the authenication Room")
})


router.post("/register", async (req,res)=>{
   
    const {error} =registervalidation(req.body)
    if(error) 
    {
        return res.status(400).send(error.details[0].message)
    }
    // checking the user already exists
 
        
    const emailExist=await User.findOne({email:req.body.email})
    if(emailExist)
    {
        return res.status(400).send("Email Already Exists")
    }
    
    const salt= await bcrypt.genSalt(10)  
    const hashedpassword =await bcrypt.hash(req.body.password,salt)
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
    })

    try {
        const savedUser =await user.save();
        res.status(200).send(savedUser) 
    } catch (error) {
        res.status(400).send({status:"Faliure", msg:err })
    }
})

router.post('/login',async (req,res) => {
    const{error} =loginvalidation(req.body)
    if(error)
    {
        return res.status(400).send(error.details[0].message)
    }
    
    const user=await User.findOne({email:req.body.email})
    if(!user)
    {
        return res.status(400).send("Invalid Email")
    }
   
    const validpass =await bcrypt.compare(req.body.password,user.password)
    if(!validpass)
    {
        return res.status(400).send('Invalid Password')
    }
    const token = JWT.sign({_id:user._id},process.env.TOKEN_SECRET)

    res.header('auth-token',token).send(token)
})

module.exports=router;