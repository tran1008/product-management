// [GET] /admin/product
const product=require('../../models/product.model')
module.exports.index= async(req,res)=>{
    // console.log(req.query.status)
    let filterStatus=[
        {
            name:"Tất cả",
            status:"",
            class:""
        },
        {
            name:"Hoạt động",
            status:"active",
            class:""
        },
        {
            name:"Dừng hoạt động",
            status:"inactive",
            class:""
        }
    ]
    if(req.query.status){
        const index=filterStatus.findIndex(item=>item.status==req.query.status)
        filterStatus[index].class="active";
    }
    else
    {
        const index=filterStatus.findIndex(item=>item.status=="")
        filterStatus[index].class="active"
    }
    let find={
        deleted:false
    }
    if(req.query.status){
        find.status=req.query.status // gán lại key status trong bộ lọc find thành req.query.status
    }
    const products= await product.find(find)
    // làm giao diện sản phẩm
    // console.log(products);
    res.render('admin/pages/product/index.pug',{
        pageTitle:"Trang danh sách sản phẩm",
        product:products,
        filterStatus:filterStatus
    })
}