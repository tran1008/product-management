const User=require("../../models/user.model.js")
const Cart=require("../../models/cart.model.js")
const md5=require('md5')
const generate=require('../../helper/generate.js')
const ForgotPassword=require('../../models/forgot-password.model.js')
const sendMailHelper=require('../../helper/sendMail.js')
module.exports.register = async (req, res) => {
    res.render('client/pages/register/index.pug', {
        pageTitle: "Đăng ký tài khoản"
    })
}
module.exports.registerPost = async (req, res) => {
    // check xem liệu email này đã tồn tại trong hệ thống hay chưa
    const existEmail=await User.findOne({
        email:req.body.email,
        deleted:false
    })
    if(existEmail){
        req.flash("error", ` Email ${req.body.email} đã tồn tại trong hệ thống`)
        res.redirect("back");
        return;
    }
    req.body.password=md5(req.body.password)
    const user=new User(req.body);
    await user.save();
    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/");
}
module.exports.login = async (req, res) => {
    res.render('client/pages/login/login.pug', {
        pageTitle: "Đăng nhập"
    })
}

module.exports.loginPost=async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const user=await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        req.flash("error", ` Email không tồn tại`)
        res.redirect("back");
        return;
    }
    if(user.password !== md5(password)){
        req.flash('error', ' Mật khẩu không đúng');
        res.redirect("back");
        return
    }
    if(user.status ==="inactive"){
        req.flash('error', 'Tài khoản đã bị khóa');
        res.redirect("back");
        return
    }
    res.cookie("tokenUser",user.tokenUser)
    // ở đây chúng ta lưu thêm cái user_id để biết rằng giỏ hàng này của ô nào đang mua
    const cart=await Cart.findOne({
        user_id:user.id
    })
    if(cart){
        res.cookie("cartId",cart.id)
    }else{
        await Cart.updateOne({
            _id:req.cookies.cartId // tìm _id của cart trùng với cartId hiện tại 
        },{
            user_id:user.id
        })
    }
    res.redirect("/");
}

module.exports.logout=async(req,res)=>{
    res.clearCookie("tokenUser");
    res.clearCookie("cartId");
    res.redirect("/")
}

module.exports.forgotpassword=async(req,res)=>{
    res.render('client/pages/password/forgot-password.pug', {
        pageTitle: "Quên mật khẩu"
    })  
}

module.exports.forgotpasswordPost=async(req,res)=>{
    const email=req.body.email;
    const user=User.findOne({
        email:email,
        deleted:false
    })
    if(!user){ // check xem liệu cái user này đã tồn tại hay chưa
        req.flash("error", ` Email không tồn tại`)
        res.redirect("back");
        return;
    }
    // lưu thông tin vào database
    const otp=generate.generateRandomNumber(8)
    const objectForgotPassword={
        email:email,
        otp:otp,
        expireAt:Date.now()
    }
    const forgotpassword=new ForgotPassword(objectForgotPassword);
    await forgotpassword.save();
    // nếu tồn tại email thì gửi otp qua gmail đó, đầu tiên cần phải đăng ký một tài khoản gmail trước đã
    const subject= 'Product-Management: Password Reset';
    const html= `<h2 style='color: #2877fd' >Product-Management!</h2>
    <span>Your new password is: </span>${otp}`;
    sendMailHelper.sendMail(email,subject,html);
    res.redirect(`/user/password/otp/?email=${email}`)
    // res.send("oke")
}

module.exports.otpPassword=async(req,res)=>{
    const email=req.query.email;
    res.render('client/pages/password/otp-password.pug', {
        pageTitle: "Nhập mã OTP",
        email:email
    })  
}

module.exports.otpPasswordPost=async(req,res)=>{
    const email=req.body.email;
    const otp=req.body.otp;
    const result=await ForgotPassword.findOne({
        email:email,
        otp:otp
    })
    if(!result){
        req.flash("error", `Mã Otp Không hợp lệ`)
        res.redirect("back");
        return;
    }
    const user=await User.findOne({
        email:email
    })
    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/user/password/reset")
}

module.exports.resetPassword=async(req,res)=>{
    res.render('client/pages/password/reset-password.pug', {
        pageTitle: "Nhập mã OTP",
    })
}

module.exports.resetPasswordPost=async(req,res)=>{
    const password=req.body.password;
    const tokenUser=req.cookies.tokenUser;
    await User.updateOne({
        tokenUser:tokenUser,
    },{
        password:md5(password)
    })
    res.redirect("/")
}


module.exports.infoUser=async(req,res)=>{
    res.render('client/pages/login/user.pug', {
        pageTitle: "Thông tin cá nhân",
    })
}