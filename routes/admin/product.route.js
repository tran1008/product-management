const express=require('express')
const multer  = require('multer')
const router=express.Router();
const upload = multer({ dest: "../public/uploads/" })
const controller=require("../../controllers/admin/product.controller.js")
router.get('/',controller.index)
router.patch('/change-status/:status/:id',controller.changeStatus)
router.patch('/change-multi',controller.multi)
router.delete('/delete/:id',controller.deleteItem)
// phương thức get là dễ vẽ ra giao diện còn phương thức post dùng để truyền data lên
router.get('/create',controller.create);
router.post('/create',upload.single("thumbnail"),controller.createPost);
router.get('/detail/:id',controller.detail);
module.exports=router; 