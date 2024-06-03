const express=require('express')
const mongoose = require('mongoose');
const methodOverride = require('method-override') // dùng để truyền các phương thức khác cho bug thay vì truyền bình thường là get và post
const flash = require('express-flash')
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')
const session = require('express-session')
require("dotenv").config();
const systemconfig=require("./config/system.js")
const database=require('./config/database')
const route=require("./routes/client/index.route")
const routeAdmin=require("./routes/admin/index.route")

// connect xong rồi thì tạo ra model để query dữ liệu từ cơ sở dữ liệu
database.connect();
// console.log(database)
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const app=express();
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false })) // đoạn này extended bằng false có nghĩa rằng this object will  contain a key-value, where the value can be a string or array
//Flash
app.use(cookieParser('KGKAKCKDKQ'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash
const port=process.env.PORT;
app.set('views', `${__dirname}/views`);
app.set('views engine', 'pug');
app.use(express.static(`${__dirname}/public`)) //cấu hình file tĩnh
// APP LOCAL VARIABLE
app.locals.prefixAdmin=systemconfig.prefixAdmin
route(app)
routeAdmin(app)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
