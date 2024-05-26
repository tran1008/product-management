const express=require('express')
const mongoose = require('mongoose');
require("dotenv").config();

const database=require('./config/database')
const route=require("./routes/client/index.route")
// connect xong rồi thì tạo ra model để query dữ liệu từ cơ sở dữ liệu
database.connect();
// console.log(database)
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const app=express();
const port=process.env.PORT;
app.set('views', './views');
app.set('views engine', 'pug');
app.use(express.static('public')) //cấu hình file tĩnh
route(app)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
