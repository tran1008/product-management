const express=require('express')
const multer = require('multer')
const upload = multer()
const validate = require("../../validates/admin/account.validate.js")
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware.js")
const controller=require("../../controllers/admin/account.controller.js")
const router=express.Router();
router.get('/',controller.index)
router.get('/create',controller.create)
router.post(
    '/create',
    upload.single("avatar"),
    uploadCloud.upload,
    controller.createPost,
    validate.createPost
);
router.get('/edit/:id', controller.edit);
router.patch(
    '/edit/:id',
    upload.single("avatar"),
    uploadCloud.upload,
    controller.editPatch,
    validate.createPost
);
module.exports=router;