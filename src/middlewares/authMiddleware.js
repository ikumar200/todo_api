// const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwtUtils');

const authenticate=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({msg:"unauthorize"});
    }

    const token=authHeader.split(' ')[1];

    try{
        const decode=verifyToken(token);
        req.user=decode;
        next();
    }catch(err){
        console.error("Token verification error:", err);
    return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports=authenticate;