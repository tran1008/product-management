const mongoose = require('mongoose');
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
// khi người ta đặt hàng thì ta cần biết là ai đã mua hàng
// nếu đăng nhập rồi thì chỉ cần lấy thông tin có sẵn và đổ ra thôi
const OrderSchema= new mongoose.Schema({ 
   // user_id:String, // khi người đùng đặt hàng thì người ta cần biết thông tin tài khoản đã đăng nhập để mua hàng là gì
    cart_id:String,
    userInfo:{
            fullName:String,
            phone:String,
            address:String
    },
    // lưu lại mảng products khi mà đặt hàng thành công sẽ reset cart_id này về một mảng rỗng
    products:[
        {
            product_id:String,
            price:Number,
            discountPercentage:Number,
            quantity:Number
        }
    ]
},{
    timestamps: true 
});
const Order = mongoose.model('Order', OrderSchema,'orders');
module.exports=Order;