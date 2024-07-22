const dashboardRoute = require("./dashboard.route.js")
const productRoute = require("./product.route.js")
const systemconfig = require("../../config/system.js")
const productCategoryRoute = require("../../routes/admin/product-category.route.js")
const rolesRoute = require('../../routes/admin/role.route.js')
const accountRoute = require('../../routes/admin/account.route.js')
const authRoute = require('../../routes/admin/auth.route.js')
const authMiddleware = require('../../middlewares/admin/auth.middleware.js')
const myAccountRoute=require('../../routes/admin/my-account.route.js')
const settingRoute=require('../../routes/admin/setting-general.route.js')
module.exports = (app) => {
    const PATH_ADMIN = systemconfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard',authMiddleware.reqAuth,dashboardRoute);
    app.use(PATH_ADMIN + '/products',authMiddleware.reqAuth,productRoute);
    app.use(PATH_ADMIN + '/products-category',authMiddleware.reqAuth, productCategoryRoute);
    app.use(PATH_ADMIN + '/roles',authMiddleware.reqAuth, rolesRoute);
    app.use(PATH_ADMIN + '/accounts',authMiddleware.reqAuth, accountRoute)
    app.use(PATH_ADMIN + '/auth', authRoute)
    app.use(PATH_ADMIN + '/my-account',authMiddleware.reqAuth,myAccountRoute)
    app.use(PATH_ADMIN + '/settings',authMiddleware.reqAuth, settingRoute)
}
// ./  hiện thị các file trong cùng một thư mục