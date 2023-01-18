const router =require('express').Router()
const User =require('../models/User')

router.get('/', (req,res)=>{
    res.send("You Have Entered the authenication Room")
})


router.post("/register", async (req,res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    try {
        const savedUser =await user.save();
        res.status(200).send(savedUser) 
    } catch (error) {
        res.status(400).send({status:"Faliure", msg:err })
    }
})

module.exports=router;