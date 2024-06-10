// [GET] /admin/product
// const product=require('../../models/product.model')
// controller là tệp dùng để nhận yêu cầu từ máy khách kết nối tới cơ sở dữ liệu và trả về dữ liệu cho người dùng
// dao là data access object dùng để lọc ra các trường hay còn gọi là schema trong db 
const filterStatusHelper = require("../../helper/filterstatus")
const searchHelper=require("../../helper/search")
const product = require('../../models/product.model')
const systemConfig=require("../../config/system")
module.exports.index= async(req,res)=>{
    // console.log(req.query.status)
    // truy vấn data từ database
    const filterStatus=filterStatusHelper(req.query)
    let find={
        deleted:false,  //lọc ra những sản phẩm chưa bị xóa
        // title:"iPhone 9"
    }
    if(req.query.status){
        find.status=req.query.status // gán lại key status trong bộ lọc find thành req.query.status
    }
    const objectSearch=searchHelper(req.query)
    
    // console.log(objectSearch);
    //req.query là trả nên những câu query trên url 
    // req.query.status trả nên những câu query tương ứng trên URL với đoạn nối chuỗi là  ?status=active
    // nó hiểu là tìm từ keyword trong database chứ không phải  từ người dùng nhập vào 
    if(objectSearch.regex){ // gán lại objectSearch cho     
        find.title=objectSearch.regex;
    }
    let objectPagination={
        currentPage:1,
        limitItems:4   // default là 4 sản phẩm ở đây
    }
    // chữ màu trắng đang là chuỗi do vậy cần phải convert về dạng number chính là chuỗi màu vàng đó
    if(req.query.page){
        objectPagination.currentPage=parseInt(req.query.page);
    }
    // đoạn này đang xử lý bên backend chưa truyền ra cập nhật giao diện cho người dùng
    objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitItems; // tính số sản phẩm hiển thị trên một page
    const countProduct= await product.countDocuments(find)
    const totalPage=Math.ceil(countProduct/objectPagination.limitItems); // tính số trang
    objectPagination.totalPage=totalPage;
    // console.log(objectPagination.currentPage);
    const products= await product.find(find).sort({position:"desc"}).limit(objectPagination.limitItems).skip(objectPagination.skip)//truy vấn data trong database nên phải có await ở đây thì skip sẽ thực hiện trước
    // làm giao diện sản phẩm
    // console.log(products);
    res.render('admin/pages/products/index.pug',{
        pageTitle:"Trang danh sách sản phẩm",
        product:products,
        filterStatus:filterStatus,
        keyword:objectSearch.keyword,
        pagination:objectPagination
    })
}
//:status là truyền status là route động :id
// cánh này cũng được xử lý logic cũng link sang được trang khác nhưng ở đây là method get khi mà người dùng cố tình truy cập vào method get đó thì nó sẽ vô tình update lại giao diện
// ví dụ người dùng cố tình truy cập vào method là get thì nó sẽ không cập nhật lại giao diện vì không đúng logic
// req.query là sau dấu chấm hỏi
//update lại vào trong db

module.exports.changeStatus= async(req,res)=>{
    // console.log(req.params)
    const status=req.params.status // gán lại trạng thái sau khi đã gửi form và update vào database
    const id=req.params.id // gán id sau khi đã gửi form
    await product.updateOne({ _id : id }, {status : status });
    req.flash('success', 'Cập nhật trạng thái thành công');
    res.redirect("back");
}
// nối các phần tử của mảng lại với nhau thành một chuỗi
// danh sách các id dung .split là convert về thành từng phần tử và lưu vào một mảng
module.exports.multi= async(req,res)=>{
    const type=req.body.type;
    const ids=req.body.ids.split(", "); //convert lại về thành từng phần tử và lưu vào 1 mảng
    switch (type) {
        case "active":
            await product.updateMany({_id:{$in:ids}},{status:"active"})
            req.flash('success', `'Cập nhật trạng thái thành công ${ids.length} sản phẩm !`);
            break;
        case "inactive":
            await product.updateMany({_id:{$in:ids}},{status:"inactive"})
            req.flash('success', `'Cập nhật trạng thái thành công ${ids.length} sản phẩm !`);
            break;
        case "delete-all":
            await product.updateMany({_id:{$in:ids}},{deleted:true})
            break;
        case "change-position":
            // console.log(ids);
            for(const item of ids){ // for of là lặp qua các phần tử của mảng 
                // console.log(item.split("+"));
                // dùng cấu trúc destructering
                let [id,position]=item.split("+");
                position=parseInt(position); // màu vàng mới là kiểu number
                await product.updateOne({ _id :id }, { position : position });
            }
            break;
        default:
            break;
    }
    res.redirect("back");
}

module.exports.deleteItem= async(req,res)=>{
    // console.log(req.params)
    // const status=req.params.status // gán lại trạng thái sau khi đã gửi form và update vào database
    const id=req.params.id // gán id sau khi đã gửi form
    // await product.deleteOne({_id:id}) này là xóa cứng
    await product.updateOne({ _id : id }, //này là xóa mềm nè
         {
            deleted:true,
            deletedAt:new Date()
        });
    res.redirect("back");
}

module.exports.create= async(req,res)=>{
    res.render('admin/pages/products/create.pug',{
        pageTitle:"Tạo mới 1 sản phẩm",
    })
}
module.exports.createPost=async(req,res)=>{
    req.body.price=parseInt(req.body.price)
    req.body.discountPercentage=parseInt(req.body.discountPercentage)
    req.body.stock=parseInt(req.body.stock)
    // console.log(req.body);
    if(req.body.position == " "){
        const countProduct= await product.count();
        req.body.position=countProduct+1;
    }else{
        req.body.position=parseInt(req.body.position);
    }
    const products=new product(req.body)
    await products.save();
    res.redirect("/admin/products");
}

module.exports.detail=async(req,res)=>
{
    try{
        let find={
            deleted:false,
            _id:req.params.id
        }
        const products =await product.findOne(find)
        res.render('admin/pages/products/detail.pug',{
            pageTitle:products.title,
            product:products,
        })
    }catch(error){
        res.redirect(`${systemConfig}/products`)
    }


}