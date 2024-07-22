const Product =require('../../models/product.model.js')
const productHelper=require('../../helper/product.js')
module.exports.index = async (req, res) => {
    const keyword=req.query.keyword
    let newProduct=[]
    if(keyword){
        const regex=new RegExp(keyword,"i")
        const products=await Product.find({
            title:regex,
            status:"active",
            deleted:false
        })
        newProduct=productHelper.priceNewProducts(products)
    }
    res.render('client/pages/search/index.pug', { // req.query là sau cặp dấu chấm hỏi nhớ cho giùm gồm key và value
        pageTitle: "Tìm kiếm sản phẩm",
        keyword:keyword,
        products:newProduct
    })
}
