
const catchAsync = require("../middlewares/errorHandiling");
const sallerModel = require("../model/orders");



const Products = async (req ,res)=>{

    const user = req.body;
    console.log(user);

    user.forEach( async (e) => {
        await sallerModel.create(e);
    });
   return res.json({
    msg:"saller product  success",
    user,
    });
};

const getItems = async (req,res)=>{
    console.log(req.headers.authorization);
    const salerId = req.headers.authorization;
    const allpro = await sallerModel.find({ SalerId: salerId });
    return res.json({
        success: true,
        allpro
    });
};

const usergetItems = async (req,res)=>{
    console.log(req.headers.authorization);
    const salerId = req.headers.authorization;
    const allpro = await sallerModel.findOne({ CustomerName: salerId });
    return res.json({
        success: true,
        allpro
    });
};

const updat = async (req ,res)=>{

    const { id } = req.params;
    const { Status } = req.body;

    if(Status === "Delete"){
        await sallerModel.findByIdAndDelete(id);
    }
    
    const order = await sallerModel.findByIdAndUpdate(id, { Status }, { new: true });
   return res.json({
    msg:"saller product  success",
    user,
    });
};



const productCont ={
    addProducts : catchAsync.catchAsync(Products),
    getProducts: catchAsync.catchAsync(getItems),
    updatProduct: catchAsync.catchAsync(updat),
    userGetItems: catchAsync.catchAsync(usergetItems),
}

module.exports = productCont;