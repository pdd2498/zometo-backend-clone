const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ShopName: {
        type: String,
        required: true,
    },
    Details: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    Image_url:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    }
});

const userModle = mongoose.model("saller" , userSchema);

module.exports = userModle ;