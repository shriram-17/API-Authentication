const router =require('express').Router()
const User =require('../models/User')
const bcrypt =require('bcrypt')

router.get('/', (req,res)=>{
    res.send("You Have Entered the authenication Room")
})


router.post("/register", async (req,res)=>{
   
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

module.exports=router;