// [GET] /admin/product-category
const ProductCategory = require('../../models/product.category.model.js')
const systemConfig = require("../../config/system.js")
const creatTreeHelper = require("../../helper/createTree.js")
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,  //lọc ra những sản phẩm chưa bị xóa
        // title:"iPhone 9"
    }
    const records = await ProductCategory.find(find); // thừa dấu chấm aaa chết tôi
    const newRecord = creatTreeHelper.tree(records)
    res.render('admin/pages/products-category/index.pug', {
        pageTitle: "Danh mục sản phẩm",
        records: newRecord,
    })
}

module.exports.create = async (req, res) => { // phần này dùng để post và lưu vào trong database và hiện thị lại giao diện
    // console.log(req.file)

    let find = {
        deleted: false,  //lọc ra những sản phẩm chưa bị xóa
        // title:"iPhone 9"
    }
    const records = await ProductCategory.find(find); // thừa dấu chấm aaa chết tôi 
    const newRecord = creatTreeHelper.tree(records);
    // console.log(newRecord); 
    res.render('admin/pages/products-category/create.pug', {
        pageTitle: "Tạo Danh mục sản phẩm",
        records: newRecord
    })
}
module.exports.createPost = async (req, res) => { // phần này dùng để post và lưu vào trong database và hiện thị lại giao diện
    const permission = res.locals.role.permission
    if (permission.includes("product-category-create")) {
        if (req.body.position == "") {
            const count = await ProductCategory.countDocuments();
            req.body.position = count + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
        const record = new ProductCategory(req.body)
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    } else {
        console.log("Không có quyền ở đây")
        return;
    }
}
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
        const find = {
            deleted: false,
            _id: id
        }
        const newdata = await ProductCategory.findOne(find); // nhớ kỹ luôn sai đoạn này nha huy // đây là 1 bản
        const records = await ProductCategory.find({
            deleted: false, // tìm tất cả bản records
        }); // thừa dấu chấm aaa chết tôi 
        const newRecord = creatTreeHelper.tree(records);
        res.render('admin/pages/products-category/edit.pug', {
            pageTitle: "Chỉnh sửa 1 sản phẩm",
            data: newdata,
            records: newRecord

        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position)
    console.log(req.body);
    try {
        await ProductCategory.updateOne({ _id: id }, req.body)
        req.flash('success', 'Cập nhật danh mục thành công')

    } catch (error) {
        req.flash('error', 'Cập nhật danh mục thât bại');
    }
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}