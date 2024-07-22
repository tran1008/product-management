// [GET] /product
const Product = require('../../models/product.model')
const ProductCategory=require('../../models/product.category.model.js')
const productHelper=require("../../helper/product.js")
const ProductCategoryHelper=require("../../helper/products.js")
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" })
    // công thức tính phần trăm giảm giá bằng (100-phần trăm giảm giá)/100 *price
    const newProducts = products.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
        return item;
    });
    // console.log(newProducts)
    res.render('client/pages/products/index.pug', {
        pageTitle: "Trang sản phẩm",
        products: newProducts
    })
}

module.exports.detail = async (req, res) => {
    try {
        let find = {
            deleted: false,
            slug: req.params.slugProduct,
            status:"active"
        }
        const product = await Product.findOne(find)
        // tiến hành lấy ra sản phẩm
        if(product.product_category_id){
            // tiến hành lấy ra danh mục của sản phẩm chi tiết đó
            const category=await ProductCategory.findOne({
                _id:product.product_category_id,
                deleted:false,
                status:"active"
            })
            product.category=category
        }
        product.priceNew=productHelper.priceNewProduct(product)
        res.render('client/pages/products/detail.pug', {
            pageTitle: product.title,
            product: product,
        })
    } catch (error) {   
        res.redirect(`/products`)
    }
}
module.exports.category= async(req,res)=>{
    console.log(req.params.slugCategory);
    const category=await ProductCategory.findOne({  // tìm danh mục
        slug:req.params.slugCategory,
        status:"active",
        deleted:false
    })
    const listCategory=await ProductCategoryHelper.getSubCategory(category.id) 
    const listCategoryId=listCategory.map(item=>item.id)
    const productNew =await Product.find({ // tìm sản phẩm của danh mục đó
        product_category_id:{$in:[category.id,...listCategoryId]},  
        deleted:false,
        status:"active"
    })
    const newproductNew=productHelper.priceNewProducts(productNew)
    res.render('client/pages/products/index.pug', {
                pageTitle: category.title,
                products: newproductNew,
        })

}