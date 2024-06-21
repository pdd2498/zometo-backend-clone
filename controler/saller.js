const sallerModel = require("../model/saller");
// const bcrypt = require("bcrypt");
const catchAsync = require("../middlewares/errorHandiling");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");




dotenv.config();

const uplodeDirectorypath = path.join(__dirname , ".." , "photos");

const storage = multer.diskStorage({
    destination: function(req,res,cd){
        cd(null, uplodeDirectorypath);
    },
    filename: (req,file,cb)=>{
        const fileName = Date.now() + '_' + file.originalname;
        cb(null, fileName);
    }
});
const uplode = multer({
    storage: storage,
}).single("Image");


const saller = async (req ,res)=>{

    uplode(req,res, async (err)=>{
        if(err){
            console.log("file uploding err",err);
        return;
        }
        console.log(req.body,"  ",req.file);
        // const salt = bcrypt.genSaltSync(5);
        // const hase = bcrypt.hashSync(req.body.password , salt);

    const user = {
        ...req.body,
        // password: hase,
        Image_url: `https://zometo-backend-clone-2.onrender.com/profile/${req.file.filename}`,
    };
    await sallerModel.create(user);

   return res.json({
    msg:"saller rejuster success",
    user,
    });
    })
};

const login = async (req ,res )=>{
    const {Username , password} = req.body;

    const user = await sallerModel.findOne({Username});

    if(!user){
        return res.json({
            success: false,
            message: "Inavlid username or password"
        });
    }
    
    // const isPassword = bcrypt.compareSync(password , user.password);

    const isPassword = (password === user.password);

    if(!isPassword){
        return res.json({
            success: false,
            message: "Inavlid password"
        })
    }
    const jwtpaylode = {
        role: user.role,
        id: user.id,
        email: user.email,
        exp: new Date().getTime() + 3600*1000
    };
    const token = jwt.sign(jwtpaylode , process.env.JWT_KEY);
    console.log(token);

    res.json({
        sucess: true,
        Saller: "saller",
        token,
    });
}

const sallerControler = {
    userSaller: catchAsync.catchAsync(saller),
    sallerLogin : catchAsync.catchAsync(login),
}

module.exports = sallerControler;