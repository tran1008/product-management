const mongoose = require('mongoose');
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const ProductSchema= mongoose.Schema({ 
    title:String,
    product_category_id:{
        type:String,
        default:""
    },
    description:String,
    price:Number,
    discountPercentage:Number,
    stock:Number,
    thumbnail:String,
    status:String,
    featured:String,
    position:Number,
    slug:{
         type: String,
          slug: "title",
          unique: true 
    },
    createdBy:{
        account_id:String,
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    deleted:{
        type:Boolean,
        default:false,
    },
    deletedBy:{
        account_id:String,
        deletedAt:Date
    },
    updatedBy:[  // lưu thành một mảng các object để lấy nhiều giá trị hơn
        {
        account_id:String,
        updatedAt:Date
    }
    ],  
},{
    timestamps: true 
});
const Product = mongoose.model('Product', ProductSchema,'products');
module.exports=Product;