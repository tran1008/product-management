const User=require('../../models/user.model.js')
module.exports.reqAuth= async(req, res, next)=>{
   if(!req.cookies.tokenUser){ // check xem liệu có token hay chưa
        res.redirect('/user/login')
   }else{
    const user= await User.findOne({tokenUser:req.cookies.tokenUser}).select("-password")
    if(!user){ // check xem liệu có phải đúng người dùng đó có cái token đó thì mới cho vào
        res.redirect('/user/login')
    }else{
        res.locals.user=user; // sử dụng biến này trong một file khác
        next();
    }
   }
}
// middleware là phần mềm trung gian giúp nhận yêu cầu từ máy khách trước khi có phản hồi từ máy chủ