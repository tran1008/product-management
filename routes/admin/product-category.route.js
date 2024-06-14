const express=require('express')
const multer = require('multer')
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware.js")
const validateCategory = require("../../validates/admin/product.category.validate.js")
const router=express.Router();
const controller=require("../../controllers/admin/product-category-controller.js")
const upload = multer()
router.get('/',controller.index)
router.get('/create', controller.create); // phương thức tạo mới một sản phẩm
router.post(
    '/create',
    upload.single("thumbnail"),
    uploadCloud.upload,
    controller.createPost,
    validateCategory.createPost
);
module.exports=router;