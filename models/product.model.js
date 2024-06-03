const mongoose = require('mongoose');
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
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
    slug:{
         type: String,
          slug: "title",
          unique: true 
    },
    deleted:{
        type:Boolean,
        default:false,
    },
    deletedAt:Date
},{
    timestamps: true 
});
const Product = mongoose.model('Product', ProductSchema,'products');
module.exports=Product;