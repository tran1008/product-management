const dashboardRoute=require("./dashboard.route.js")
const productRoute=require("./product.route.js")
const systemconfig=require("../../config/system.js")
module.exports=(app)=>{
    const PATH_ADMIN=systemconfig.prefixAdmin;
    app.use(PATH_ADMIN +'/dashboard',dashboardRoute);
    app.use(PATH_ADMIN +'/products',productRoute);
}

// ./  hiện thị các file trong cùng một thư mục