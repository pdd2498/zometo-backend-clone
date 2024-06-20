const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");

dotenv.config();

const userData = async (req , res , next)=>{
    const token = req.headers;
    if(!token.authorization){
        res.status(404).json({
            msg: "unvalid token"
        })
    }


    try{
        jwt.verify(token.authorization , process.env.JWT_KEY);

    } catch(err){
        res.status(404).json({
        msg: "jwt err"
       });
    };

    const tokenDecod = jwt.decode(token.authorization);

    // cheking token is exp or not

    const tokenExp = tokenDecod?.exp < Math.ceil(new Date().getTime()/1000);
    const tokenisu = tokenDecod?.iat > Math.ceil(new Date().getTime()/1000);

    if(tokenExp || tokenisu){
        return res.status(401).json({
            msg: "token exp"
        });
    };

    // cheking is user id is valid or not

    const id = tokenDecod?.id;
    const userId = await UserModel.findById(id);
    if(!userId){
        return res.status(401).json({
            msg: "user id not found"
        });
    };
    req.user = userId;
    next();
};

module.exports = userData;