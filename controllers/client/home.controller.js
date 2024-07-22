const Product=require('../../models/product.model.js')
const productHelper=require("../../helper/product.js")
// [GET] /home
module.exports.index=async (req,res)=>{
    // hiện thi danh sách sản phẩm nổi bật
    const find={
        status:"active",
        featured:"1",
        deleted:false
    }
    const productFeatured=await Product.find(find).limit(6)
    const newProductFeatured=productHelper.priceNewProducts(productFeatured)
    // hết phần hiện thi danh sách sản phẩm nổi bật
    const productNew= await Product.find({
        deleted:false,
        status:"active"
    }).sort({position:"desc"}).limit(6)
    const newproductNew=productHelper.priceNewProducts(productNew)
    res.render('client/pages/home/index.pug',{
        pageTitle:"Trang chủ",
        productFeatured:newProductFeatured,
        productNew:newproductNew
    })
}