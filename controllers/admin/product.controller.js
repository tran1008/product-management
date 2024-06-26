// [GET] /admin/product
// const product=require('../../models/product.model')
// controller là tệp dùng để nhận yêu cầu từ máy khách kết nối tới cơ sở dữ liệu và trả về dữ liệu cho người dùng
// dao là data access object dùng để lọc ra các trường hay còn gọi là schema trong db 
const filterStatusHelper = require("../../helper/filterstatus")
const searchHelper = require("../../helper/search")
const Product = require('../../models/product.model')
const systemConfig = require("../../config/system")
const ProductCategory = require('../../models/product.category.model.js')
const creatTreeHelper = require('../../helper/createTree.js')
const Account = require("../../models/account.model.js")
module.exports.index = async (req, res) => {
    // console.log(req.query.status)
    // truy vấn data từ database
    const filterStatus = filterStatusHelper(req.query)
    let find = {
        deleted: false,  //lọc ra những sản phẩm chưa bị xóa
        // title:"iPhone 9"
    }
    if (req.query.status) {
        find.status = req.query.status // gán lại key status trong bộ lọc find thành req.query.status
    }
    const objectSearch = searchHelper(req.query)

    // console.log(objectSearch);
    //req.query là trả nên những câu query trên url 
    // req.query.status trả nên những câu query tương ứng trên URL với đoạn nối chuỗi là  ?status=active
    // nó hiểu là tìm từ keyword trong database chứ không phải  từ người dùng nhập vào 
    if (objectSearch.regex) { // gán lại objectSearch cho     
        find.title = objectSearch.regex;
    }
    let objectPagination = {
        currentPage: 1,
        limitItems: 4   // default là 4 sản phẩm ở đây
    }
    // chữ màu trắng đang là chuỗi do vậy cần phải convert về dạng number chính là chuỗi màu vàng đó
    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }
    // phần xử lý backend như này là xong giờ xử lý đến phần front end để cho nó hiện thị ra ngoài giao diện người dùng nữa là oke men
    let sort = {

    }
    if (req.query.sortKey && req.query.sortValue) { // truyền vào giá trị là một string nên phải đưa vào dấu ngoặc vuông ở đoạn này
        sort[req.query.sortKey] = req.query.sortValue
    } else {
        sort.position = "desc" // default thì sắp xếp theo vị trí giảm dần từ trên xuống dưới
    }
    // đoạn này đang xử lý bên backend chưa truyền ra cập nhật giao diện cho người dùng
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems; // tính số sản phẩm hiển thị trên một page
    const countProduct = await Product.countDocuments(find)
    const totalPage = Math.ceil(countProduct / objectPagination.limitItems); // tính số trang
    objectPagination.totalPage = totalPage;
    // console.log(objectPagination.currentPage);
    const products = await Product.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip)//truy vấn data trong database nên phải có await ở đây thì skip sẽ thực hiện trước
    // làm giao diện sản phẩm
    // console.log(products);
    for (const product of products) { //
        // Lấy ra thông tin người tạo
        const user = await Account.findOne({
            _id: product.createdBy.account_id  // kiểm tra tài khoản có _id có trùng với id đã tạo
        })
        if (user) {
            product.accountFullName = user.fullName
        }
        // Lấy ra thông tin người cập nhật gần nhất
        const updateBy = product.updatedBy.slice(-1)[0];
        if (updateBy) {
            const userUpdated = await Account.findOne({
                _id: updateBy.account_id  // kiểm tra tài khoản có _id có trùng với id đã tạo
            })
            if (user) {
                updateBy.accountFullName = userUpdated.fullName
            }
        }
    }
    res.render('admin/pages/products/index.pug', {
        pageTitle: "Trang danh sách sản phẩm",
        product: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}
//:status là truyền status là route động :id
// cánh này cũng được xử lý logic cũng link sang được trang khác nhưng ở đây là method get khi mà người dùng cố tình truy cập vào method get đó thì nó sẽ vô tình update lại giao diện
// ví dụ người dùng cố tình truy cập vào method là get thì nó sẽ không cập nhật lại giao diện vì không đúng logic
// req.query là sau dấu chấm hỏi
//update lại vào trong db

module.exports.changeStatus = async (req, res) => {
    // console.log(req.params)
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }
    const status = req.params.status // gán lại trạng thái sau khi đã gửi form và update vào database
    const id = req.params.id // gán id sau khi đã gửi form
    await Product.updateOne({ _id: id },
        {
            status: status,
            $push: { updatedBy: updatedBy }
        },);
    req.flash('success', 'Cập nhật trạng thái thành công');
    res.redirect("back");
}
// nối các phần tử của mảng lại với nhau thành một chuỗi
// danh sách các id dung .split là chuyển từ dạng string về thành dạng mảng
module.exports.multi = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", "); //convert lại về thành từng phần tử của mảng và lưu vào 1 mảng
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm !`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm !`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } },
                {
                    deleted: true,
                    deletedBy: {
                        account_id: req.locals.user.id,
                        deletedAt: new Date()
                    }
                })
            req.flash('success', `Đã xóa thành công ${ids.length} sản phẩm !`);
            break;
        case "change-position":
            // console.log(ids);
            for (const item of ids) { // for of là lặp qua các phần tử của mảng 
                // console.log(item.split("+"));
                // dùng cấu trúc destructuring
                let [id, position] = item.split("+");
                position = parseInt(position); // màu vàng mới là kiểu number
                await Product.updateOne({ _id: id }, { position: position, $push: { updatedBy: updatedBy } });
                req.flash('success', `Đã đổi vị trí thành công ${ids.length} sản phẩm !`);
            }
            break;
        default:
            break;
    }
    res.redirect("back");
}

module.exports.deleteItem = async (req, res) => {
    // console.log(req.params)
    // const status=req.params.status // gán lại trạng thái sau khi đã gửi form và update vào database
    const id = req.params.id // gán id sau khi đã gửi form
    // await product.deleteOne({_id:id}) này là xóa cứng
    await Product.updateOne({ _id: id }, //này là xóa mềm nè
        {
            deleted: true,
            deletedBy: {
                account_id: req.locals.user.id,
                deletedAt: new Date()
            }
        });
    res.redirect("back");
}

module.exports.create = async (req, res) => {  // phần này dùng để get và hiện thị ra giao diện
    let find = {
        deleted: false,  //lọc ra những sản phẩm chưa bị xóa
        // title:"iPhone 9"
    }
    const records = await ProductCategory.find(find); // thừa dấu chấm aaa chết tôi 
    const newRecord = creatTreeHelper.tree(records);
    res.render('admin/pages/products/create.pug', {
        pageTitle: "Tạo mới 1 sản phẩm",
        records: newRecord
    })
}
module.exports.createPost = async (req, res) => { // phần này dùng để post và lưu vào trong database và hiện thị lại giao diện
    // console.log(req.file)
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    // console.log(req.body);
    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    req.body.createdBy = {
        account_id: res.locals.user.id
    }
    const products = new Product(req.body)
    await products.save();
    res.redirect(`/admin/products`);
}
// tạo route động thì lúc console.log(req.params.id)
module.exports.edit = async (req, res) => {
    console.log(req.params.id);
    try {
        const find = { // lấy các trường này để tìm trong database xem bản ghi đó trùng với cái trường nào đang được sửa
            deleted: false,
            _id: req.params.id
        };
        const products = await Product.findOne(find);
        const records = await ProductCategory.find({
            deleted: false,  //lọc ra những sản phẩm chưa bị xóa
            // title:"iPhone 9"
        }); // thừa dấu chấm aaa chết tôi 
        const newCategory = creatTreeHelper.tree(records);

        res.render('admin/pages/products/edit.pug', {
            pageTitle: "Chỉnh sửa 1 sản phẩm",
            product: products,
            category: newCategory
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    // console.log(req.body);
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }
    // req.body.updatedBy=updatedBy
    try {
        await Product.updateOne({ _id: id }, {
            ...req.body, // giải các phần tử cũ vào đây
            $push: { updatedBy: updatedBy }
        }); // update lại vào trong database
        req.flash('success', 'Cập nhật sản phẩm thành công');
    } catch (error) {
        req.flash('error', 'Cập nhật sản phẩm thât bại');
    }
    res.redirect("/admin/products");
}
module.exports.detail = async (req, res) => {
    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }
        const products = await Product.findOne(find)
        res.render('admin/pages/products/detail.pug', {
            pageTitle: products.title,
            product: products,
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}