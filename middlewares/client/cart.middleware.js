const Cart=require('../../models/cart.model')
module.exports.cartId=async(req,res,next)=>{
    if(!req.cookies.cartId){
        // tiến hành tạo mới một cartId
        const cart=new Cart()
        await cart.save();
        const expireCookie=365*24*60*60*1000
        res.cookie("cartId",cart.id,{expires: new Date(Date.now() + expireCookie)})
    }else{
        // chỉ cần lấy ra thôi
        const cart=await Cart.findOne({
            _id:req.cookies.cartId
        })
        cart.totalQuantityNumber=cart.products.reduce((sum,item)=>sum+item.quantity,0);
        res.locals.minicart=cart;
    }
    next();
}