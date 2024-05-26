const mongoose = require('mongoose');

// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const ProductSchema= mongoose.Schema({ 
    title:String,
    description:String,
    price:Number,
    discountPercentage:Number,
    stock:Number,
    thumbnail:String,
    status:String,
    position:Number,
    deleted:Boolean
});
const Product = mongoose.model('Blog', ProductSchema,'products');
module.exports=Product;