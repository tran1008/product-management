const ProductCategory = require('../../models/product.category.model.js')
const creatTreeHelper=require("../../helper/createTree.js")
module.exports.category=async(req,res,next)=>{
    let find = {
        deleted: false,  //lọc ra những sản phẩm chưa bị xóa
        // title:"iPhone 9"
    }
    const productCategory = await ProductCategory.find(find); // thừa dấu chấm aaa chết tôi
    const newProductCategory=creatTreeHelper.tree(productCategory)
    res.locals.layoutProductCategory=newProductCategory
    next();
}