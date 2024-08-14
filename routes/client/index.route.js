const homeRoutes=require("./home.router")
const productRoutes=require("./product.route")
const categoryMiddleware=require("../../middlewares/client/category.middleware")
const cartMiddleware=require("../../middlewares/client/cart.middleware.js")
const useMiddleware=require("../../middlewares/client/user.middleware.js")
const settingMiddleware=require("../../middlewares/client/setting.middleware.js")
const searchRoutes=require("../../routes/client/search.router")
const cartRoutes=require("../../routes/client/cart.route.js")
const checkoutRoutes=require("../../routes/client/checkout.route.js")
const userRoutes=require("../../routes/client/user.route.js")
const usersRoutes=require("../../routes/client/users.route.js")
const chatRoutes=require("../../routes/client/chat.route.js")
const authMiddleware=require("../../middlewares/client/auth.middleware.js")


module.exports=(app)=>{
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cartId)
    app.use(useMiddleware.infoUser)
    app.use(settingMiddleware.Setting)
    app.use('/',homeRoutes);
    app.use('/products',productRoutes);
    app.use('/search',searchRoutes)
    app.use('/cart',cartRoutes)
    app.use('/checkout',checkoutRoutes)
    app.use('/user',userRoutes)
    app.use('/chat',authMiddleware.reqAuth,chatRoutes);
    app.use('/users',authMiddleware.reqAuth,usersRoutes);
}
// ./  hiện thị các file trong cùng một thư mục