const express = require("express");
const productCont = require("../controler/orders");

const routers = express.Router();

routers.post("/" , productCont.addProducts);
routers.get("/" , productCont.getProducts);
routers.put("/:id" , productCont.updatProduct);
routers.get("/user" , productCont.userGetItems);

module.exports = routers;