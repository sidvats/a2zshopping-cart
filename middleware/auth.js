const jwt=require('jsonwebtoken');
const user=require('../models/usermodel');

const auth=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        const verifyuser=jwt.verify(token,process.env.SECRET_KEY);
        const userdetail=await user.findOne({_id:verifyuser._id}); //gives user details using id in token
        req.user=userdetail;
        req.token=token;
        next();
    }catch(e){
        res.status(401).send("you need to login first to access this page");
    }
}

module.exports=auth;