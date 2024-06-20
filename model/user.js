const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required : false,
    },
    Username: {
        type: String,
        required: false,
    },
    Phone: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: false,
    },
    Location:{
        type: String,
        required: true,
    }
});

const userModle = mongoose.model("user" , userSchema);

module.exports = userModle ;