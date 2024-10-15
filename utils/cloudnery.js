const  v2 = require("cloudinary");
const cloudinary = require("cloudinary");
const  fs = require("fs");
const dotenv = require("dotenv");


dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});



const uploadResult = async (e) => { 
    console.log("i am heare");

    try{

        if(!e) return null;
        
        const response = await cloudinary.uploader.upload( e , {
        resource_type:"auto",
        }
    )
    console.log("file is uploded on cloudinary" , response.url);
    return response;
}
    catch(error) {
        fs.unlinkSync(e);
        console.log(error);
        return null;
    };
}

module.exports =  uploadResult;