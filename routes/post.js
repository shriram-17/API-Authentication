const { description } = require('@hapi/joi/lib/base')
const { response } = require('express')

const router =require('express').Router()
const verify = require('../routes/verifyUser')

router.get('/',verify,(req,res)=>{
    res.json({
        title:"Hello",
        description:"Hello from Post"
    })
})


module.exports=router