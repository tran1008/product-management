const systemConfig = require("../../config/system")
const Account=require('../../models/account.model.js')
const Role = require("../../models/role.model.js")
module.exports.reqAuth= async(req, res, next)=>{
   if(!req.cookies.token){ // check xem liệu có token hay chưa
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
   }else{
    const user= await Account.findOne({token:req.cookies.token}).select("-password")
    if(!user){ // check xem liệu có phải đúng người dùng đó có cái token đó thì mới cho vào
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }else{
        const role=await Role.findOne({
            _id:user.role_id // tìm những quyền do tài khoản này đăng nhập vào
        }).select("title permission")
        res.locals.user=user; // sử dụng biến này trong một file khác
        res.locals.role=role;
        next();
    }
   }
}

// middleware là phần mềm trung gian giúp nhận yêu cầu từ máy khách trước khi có phản hồi từ máy chủ