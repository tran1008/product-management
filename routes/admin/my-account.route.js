const express=require('express')
const multer = require('multer')
const upload = multer()
const router=express.Router();
const controller=require("../../controllers/admin/my-account.controller.js")
const validate = require("../../validates/admin/account.validate.js")
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware.js")
router.get('/',controller.index)
router.get('/edit', controller.edit);
router.patch(
    '/edit',
    upload.single("avatar"),
    uploadCloud.upload,
    controller.editPatch,
    validate.createPost
);
module.exports=router;