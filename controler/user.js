const userModel = require("../model/user");
// const bcrypt = require("bcrypt");
const catchAsync = require("../middlewares/errorHandiling");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();



const addNewAdmin = async (req , res) =>{

    // const salt = bcrypt.genSaltSync(5);
    // const hash = bcrypt.hashSync(req.body.password , salt);

    const user = {
        ...req.body,
        // password: hash,
    };

    await userModel.create(user);

    res.json({
        success: true,
        message: "add new admin end point",
    });

};

// const addNewDoctor = async (req , res) =>{

//     const salt = bcrypt.genSaltSync(5);
//     const hash = bcrypt.hashSync(req.body.password , salt);

//     const user = {
//         ...req.body,
//         password: hash,
//         role: "DOCTOR"
//     };

//     await userModel.create(user);

//     res.json({
//         success: true,
//         message: "new doctor added",
//     });

// };

const loginUser = async (req , res) =>{

    const {Username , password} = req.body;

    const user = await userModel.findOne({Username});

    if(!user){
        return res.status(402).json({
            success: false,
            message: "Inavlid username or password"
        });
    }
    console.log("pass 1")
    // const isPassword = bcrypt.compareSync(password , user.password);

    const isPassword = (password === user.password);

    if(!isPassword){
        return res.status(404).json({
            success: false,
            message: "Inavlid password"
        })
    }
    console.log("pass 2")


    const jwtpaylode = {
        role: user.role,
        id: user.id,
        email: user.email,
        exp: new Date().getTime() + 3600*1000
    };
    const token = jwt.sign(jwtpaylode , process.env.JWT_KEY);
    console.log(token);

    return res.json({
        sucess: true,
        token,
    });
};

const userController = {
    addNewAdmin: catchAsync.catchAsync(addNewAdmin),
    // addNewDoctor: catchAsync.catchAsync(addNewDoctor),
    loginUser: catchAsync.catchAsync(loginUser),
}

module.exports = userController;