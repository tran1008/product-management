const  uploadToCloudDinary=require("../../helper/uploadToCloudDinary.js")
module.exports.upload=async(req, res, next)=>{
    if(req.file){
        const link=await uploadToCloudDinary(req.file.buffer);
        req.body[req.file.fieldname] =link;
    }
    next();
}