const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");

dotenv.config();

const userData = async (req , res , next)=>{
    const data = req.user

    res.json({
        msg: "post viue now",
        data
    })
};

module.exports = userData;