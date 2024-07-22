const mongoose = require('mongoose');
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const CartSchema= new mongoose.Schema({ 
    user_id:String,
    products:[
        {
            product_id:String,
            quantity:Number 
        }
    ]
},{
    timestamps: true 
});
const Cart = mongoose.model('Cart', CartSchema,'carts');
module.exports=Cart;