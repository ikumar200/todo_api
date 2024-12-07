const jwt=require("jsonwebtoken");
require('dotenv').config();
const generateToken=(user)=>{
    const data={
        id: user.id,
        email: user.email,
    };
    const jwtSecret=process.env.JWT_SECRET;

    return jwt.sign(data,jwtSecret);
}

const verifyToken = (token) => {
    const jwtSecret = process.env.JWT_SECRET;
        return jwt.verify(token, jwtSecret);
    
};

module.exports={generateToken,verifyToken};