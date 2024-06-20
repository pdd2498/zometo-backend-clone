const express = require("express");
const dotenv = require("dotenv");
const router = require("./router/user")
const mongoose = require("mongoose");
const errorHandiling = require("./middlewares/errorHandiling");
const post = require("./router/post");
const saller = require("./router/saller");
const products = require("./router/products");
const core = require("cors");
const path = require("path");
const orders = require("./router/orders");

dotenv.config();

const app = express();



mongoose.connect("mongodb+srv://pdd2498:7Sx7Aloz3XQ0SlGf@cluster0.18ap8on.mongodb.net/").then(()=>console.log("data base conect successfull")).catch((err) => console.log(err , "mongose error conecting"));

app.use(core());
app.use(express.json());

const uplodeDirectorypath = path.join(__dirname , "photos");

app.use("/api/user" , router);
app.use("/api/post" ,  post);
app.use('/profile', express.static('photos'));
app.use("/api" , saller);
app.use("/api/orders", orders);
app.use("/api/products" , products);
app.use("/test" , (req,res)=>{
    return res.json({
        sucess: true,
        message: "go ahed"
    });
});

app.use(errorHandiling.errorHandler);


app.listen("10000" , ()=>console.log(`servrr is up on runing ${process.env.PORT_NO}`));