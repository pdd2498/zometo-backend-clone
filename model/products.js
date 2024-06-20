const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ShopName:{
        type: String
    },
    Name: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
    Details: {
        type: String,
        required : true,
    },
    SalerId: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        required: true,
    },
    Rating:{
        type: String,
        required: false,
    },
    location:{
        type: String,
    },
    Image_url:{
        type: String,
        required: true,
    }
});

const userModle = mongoose.model("products" , userSchema);

module.exports = userModle ;