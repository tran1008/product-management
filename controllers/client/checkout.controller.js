const Cart = require('../../models/cart.model')
const Product=require('../../models/product.model')
const ProductHelper=require('../../helper/product')
const Order=require('../../models/order.model')
module.exports.index=async (req,res)=>{
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
    res.render('client/pages/checkout/index.pug',{
        pageTitle:"Đặt hàng",
        cartDetail:cart
    })
}
// for of là lặp qua từng phần tử của mảng, for in là lặp qua từng key của một object
module.exports.order=async (req,res)=>{
    const cartId=req.cookies.cartId
    const userInfo=req.body
    const cart= await Cart.findOne({
        _id:cartId
    })
    let products=[];
    for(const product of cart.products) {
       const objectProduct={
            product_id:product.product_id,
            price:0,
            discountPercentage:0,
            quantity:product.quantity
       }
       const productInfo= await Product.findOne({
        _id:product.product_id,
       }).select("price discountPercentage")
       objectProduct.price=productInfo.price;
       objectProduct.discountPercentage=productInfo.discountPercentage;
       products.push(objectProduct);
    }
    const orderInfo={
        cart_id:cartId,
        userInfo:userInfo,
        products:products

    }
    const order= new Order(orderInfo)
    order.save();
    await Cart.updateOne({
        _id:cartId,   
    },{
        products:[]
    })
    res.redirect(`/checkout/success/${order.id}`)
}

module.exports.success=async (req,res)=>{
    const order=await Order.findOne({
        _id:req.params.orderId
    })
    for (const product of order.products) {
        const productInfo= await Product.findOne({
            _id:product.product_id
        }).select("title thumbnail")
        product.productInfo=productInfo;
        product.priceNew=ProductHelper.priceNewProduct(product)
        product.totalPrice=product.quantity*product.priceNew
    }
    order.totalPrice=order.products.reduce((sum,item)=>sum+item.totalPrice,0)
    res.render('client/pages/checkout/success.pug',{
        pageTitle:"Đặt hàng thành công",
        order:order
    })
}