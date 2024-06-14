const dashboardRoute=require("./dashboard.route.js")
const productRoute=require("./product.route.js")
const systemconfig=require("../../config/system.js")
const productCategoryRoute=require("../../routes/admin/product-category.route.js")
module.exports=(app)=>{
    const PATH_ADMIN=systemconfig.prefixAdmin;
    app.use(PATH_ADMIN +'/dashboard',dashboardRoute);
    app.use(PATH_ADMIN +'/products',productRoute);
    app.use(PATH_ADMIN +'/products-category',productCategoryRoute);
}

// ./  hiện thị các file trong cùng một thư mục