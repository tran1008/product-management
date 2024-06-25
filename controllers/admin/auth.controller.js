// [GET] /admin/login
const Account=require('../../models/account.model.js')
const systemConfig=require('../../config/system.js')
const md5=require('md5');
module.exports.login= async(req,res)=>{ // check xem nếu ở trang dashboard rồi mà người dùng có tình truy cập vào trang đăng nhập thì sẽ
    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    }else{
        res.render('admin/pages/auth/index.pug',{
            pageTitle:"Đăng nhập"
        })
    }
}
// [POST] /admin/login
//khi đăng nhập thành công thì backend phải trả về cho frontend một cái gọi là token để lưu vào cookie, từ lần sau trở đi khi người dùng truy cập vào router này thì sẽ viết một cái middleware dể đọc token từ backend gửi lên
module.exports.loginPost = async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const user= await Account.findOne({
        email:email,
        deleted:false
    })
    // console.log(user.password)
    if(!user){
        req.flash('error', 'Email không tồn tại');
        res.redirect("back");
        return;
    }
    if(md5(password) != user.password){
        req.flash('error', ' Mật khẩu không đúng');
        res.redirect("back");
        return;
    }
    if(user.status =="inactive"){
        req.flash('error', 'Tài khoản đã bị khóa');
        res.redirect("back");
        return;
    }
    res.cookie("token", user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

module.exports.logout= (req,res)=>{
    res.clearCookie("token")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}