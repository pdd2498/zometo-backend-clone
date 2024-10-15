const productModle = require("../model/products");
const catchAsync = require("../middlewares/errorHandiling");
const sallerModel = require("../model/saller");
const multer = require("multer");
const path = require("path");
const uploadResult = require("../utils/cloudnery");

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



const Products = async (req ,res)=>{

    uplode(req,res, async (err)=>{
        if(err){
            console.log("file uploding err",err);
        return;
        }

    const result = await uploadResult(req.file.path);
    

    const user = {
        ...req.body,
        Image_url: result.url,
    };

    await productModle.create(user);

   return res.json({
    msg:"saller product  success",
    user,
    });
    })
};

const getItems = async (req,res)=>{
    const allpro = await productModle.find();
    return res.json({
        success: true,
        allpro
    });
};



const productCont ={
    addProducts : catchAsync.catchAsync(Products),
    getProducts: catchAsync.catchAsync(getItems),
}

module.exports = productCont;