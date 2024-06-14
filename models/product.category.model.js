const mongoose = require('mongoose');
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const ProductCateogrySchema= mongoose.Schema({ 
    title:String,
    parent_id :{
        type:String,
        default:""
    },
    description:String,
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
const ProductCategory = mongoose.model('ProductCategory', ProductCateogrySchema,'products-category');
module.exports=ProductCategory;