const express = require("express")
const storageMulter = require("../../helper/storageMulter.js") // nên nhớ đoạn này tạo ra function storageMulter nha

const multer = require('multer')
const upload = multer()
const router = express.Router();
const controller = require("../../controllers/admin/product.controller.js")
const validate = require("../../validates/admin/product.validate.js")
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware.js")
router.get('/', controller.index)
router.patch('/change-status/:status/:id', controller.changeStatus)
router.patch('/change-multi', controller.multi)
router.delete('/delete/:id', controller.deleteItem)
// phương thức get là dễ vẽ ra giao diện còn phương thức post dùng để truyền data lên
router.get('/create', controller.create); // phương thức tạo mới một sản phẩm
router.post(
    '/create',
    upload.single("thumbnail"),
    uploadCloud.upload,
    controller.createPost,
    validate.createPost
);
router.get('/edit/:id', controller.edit);
router.patch(
    '/edit/:id',
    upload.single("thumbnail"),
    uploadCloud.upload,
    controller.editPatch,
    validate.createPost
);
router.get('/detail/:id', controller.detail);
module.exports = router; 