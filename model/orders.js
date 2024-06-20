const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
    SalerId: {
        type: String,
        required: true,
    },
    Location:{
        type: String,
    },
    CustomerName:{
        type: String,
    },
    Count:{
        type: String,
        required: true,
    },
    Status:{
        type: String,
        required: true,
    }

});

const userModle = mongoose.model("Orders" , userSchema);

module.exports = userModle ;