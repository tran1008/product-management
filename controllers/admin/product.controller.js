// [GET] /admin/product
const product=require('../../models/product.model')
const filterStatusHelper = require("../../helper/filterstatus")
const searchHelper=require("../../helper/search")
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
    const products= await product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)//truy vấn data trong database nên phải có await ở đây thì skip sẽ thực hiện trước
    // làm giao diện sản phẩm
    // console.log(products);
    res.render('admin/pages/product/index.pug',{
        pageTitle:"Trang danh sách sản phẩm",
        product:products,
        filterStatus:filterStatus,
        keyword:objectSearch.keyword,
        pagination:objectPagination
    })
}