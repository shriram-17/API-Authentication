const JWT =require('jsonwebtoken')

module.exports= (req,res,next) => {
    const token =req.header('auth-token');
    if(!token)
    {
        res.status(401).send("Access-Denied")
    }

    try
    {
        const verified=JWT.verify(token,process.env.TOKEN_SECRET);
        req.user=verified
        next()  
    }
    catch(error)
    {
        res.status(400).send('Invalid User')
    } 
    
}