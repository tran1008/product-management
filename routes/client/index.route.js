const homeRoutes=require("./home.router")
const productRoutes=require("./product.route")
module.exports=(app)=>{
    app.use('/',homeRoutes);
    app.use('/products',productRoutes);
}

// ./  hiện thị các file trong cùng một thư mục