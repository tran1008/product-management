const Cart = require('../../models/cart.model')
const Product=require('../../models/product.model')
const ProductHelper=require('../../helper/product')
module.exports.index = async (req, res) => {
    const cartId=req.cookies.cartId;
    const cart=await Cart.findOne({
        _id:cartId
    })
    if(cart.products.length > 0){
        for (const item of cart.products) {
            const productId=item.product_id
            const productInfo= await Product.findOne({
                _id:productId,
                deleted:false
            }).select("title thumbnail price discountPercentage slug")
            item.productInfo=productInfo
            item.priceNew=ProductHelper.priceNewProduct(productInfo)
            item.totalPrice=item.quantity*item.priceNew  
        }
        cart.total=cart.products.reduce((sum,item)=>sum +item.totalPrice,0)
    }
    res.render('client/pages/cart/index.pug',{
        pageTitle:"Trang giỏ hàng",
        cartDetail:cart
    })
}

module.exports.addPost = async (req, res) => {
    const productId = req.params.productId; // id của sản phẩm
    const quantity = parseInt(req.body.quantity); // số lượng sản phẩm trong trường data
    const cartId = req.cookies.cartId; // cartId tự tạo
    // console.log(productId);
    // console.log(quantity);
    // console.log(cartId);
    // query là query trong database ra á
    const cart = await Cart.findOne({
        _id: cartId
    })
    const existCartProduct = cart.products.find(item => item.product_id = productId)
    if (existCartProduct) {
        const quantityNumber = existCartProduct.quantity + quantity;
        // update một object
        // console.log(quantityNumber);
        await Cart.updateOne(
            {
                _id: cartId,
                'products.product_id': productId
            },
            {
                $set:{
                    'products.$.quantity':quantityNumber
                }
            }
        )
    } else {
        // tạo mới một object
        const objectCart = {
            product_id: productId,
            quantity: quantity
        }
        await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $push: { products: objectCart }
            }
        )
    }
    req.flash("success", "Đã thêm sản phẩm thành công")
    res.redirect("back")
}

module.exports.delete=async (req, res)=>{
    const cartId=req.cookies.cartId
    const productId=req.params.productId
    const cart= await Cart.updateOne({
        _id: cartId
    },
    {
        $pull:{products:{product_id:productId}}
    })
    req.flash("success", "Đã xóa sản phẩm thành công")
    res.redirect("back")
}

module.exports.update=async (req, res)=>{
    const cartId=req.cookies.cartId
    const productId=req.params.productId
    const quantity=req.params.quantity
    console.log(req.params)
    await Cart.updateOne(
        {
            _id: cartId,
            'products.product_id': productId
        },
        {
            $set:{
                'products.$.quantity':quantity
            }
        }
    )
    req.flash("success", "Cập nhật sản phẩm thành công")
    res.redirect("back")
}