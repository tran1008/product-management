// [GET] /product
const Product = require('../../models/product.model')
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
    console.log(newProducts)
    res.render('client/pages/products/index.pug', {
        pageTitle: "Trang sản phẩm",
        products: newProducts
    })
}