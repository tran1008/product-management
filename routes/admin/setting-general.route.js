const express=require('express')
const multer = require('multer')
const router=express.Router();
const upload = multer()
const controller=require("../../controllers/admin/setting.controller.js")
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware")
router.get('/general',controller.setting)
router.patch('/general',upload.single("logo"),uploadCloud.upload,controller.settingPatch)
module.exports=router;