// [GET] /admin/product-category
const ProductCategory = require('../../models/product.category.model.js')
const systemConfig=require("../../config/system.js")
const creatTreeHelper=require("../../helper/createTree.js")
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,  //lọc ra những sản phẩm chưa bị xóa
        // title:"iPhone 9"
    }
    const records = await ProductCategory.find(find); // thừa dấu chấm aaa chết tôi
    const newRecord=creatTreeHelper.tree(records)
    res.render('admin/pages/products-category/index.pug', {
        pageTitle: "Danh mục sản phẩm",
        records:newRecord,
    })
}

module.exports.create = async (req, res) => { // phần này dùng để post và lưu vào trong database và hiện thị lại giao diện
    // console.log(req.file)

    let find = {
        deleted: false,  //lọc ra những sản phẩm chưa bị xóa
        // title:"iPhone 9"
    }
    const records = await ProductCategory.find(find); // thừa dấu chấm aaa chết tôi 
    const newRecord =creatTreeHelper.tree(records);
    console.log(newRecord); 
    res.render('admin/pages/products-category/create.pug', {
        pageTitle: "Tạo Danh mục sản phẩm",
        records:newRecord
    })
}
module.exports.createPost = async (req, res) => { // phần này dùng để post và lưu vào trong database và hiện thị lại giao diện
    if (req.body.position == "") {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body)
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}