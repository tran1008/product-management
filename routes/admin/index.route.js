const dashboardRoute=require("./dashboard.route.js")
const systemconfig=require("../../config/system.js")
module.exports=(app)=>{
    const PATH_ADMIN=systemconfig.prefixAdmin;
    app.use(PATH_ADMIN +'/dashboard',dashboardRoute);
}

// ./  hiện thị các file trong cùng một thư mục