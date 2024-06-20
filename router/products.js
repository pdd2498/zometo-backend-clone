const express = require("express");
const productCont = require("../controler/products");

const routers = express.Router();

routers.post("/" , productCont.addProducts);
routers.get("/" , productCont.getProducts);


module.exports = routers;