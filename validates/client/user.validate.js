module.exports.register=(req,res,next)=>{
    if(!req.body.fullName){ // check xem có tạo tên hay chưa
        req.flash("error", "Vui lòng nhập họ tên !");
        res.redirect("back");
        return;
    }
    if(!req.body.email){ // check xem có email hay chưa
        req.flash("error", "Vui lòng nhập email !");
        res.redirect("back");
        return;
    }
    if(!req.body.password){ // check xem có email hay chưa
        req.flash("error", "Vui lòng nhập password !");
        res.redirect("back");
        return;
    }
    next(); // middleware dùng để xác nhận xem có trường title hay chưa nếu người dùng tạo rồi thì mới cho phép đi qua bước tiếp theo
}

module.exports.login=(req,res,next)=>{
    if(!req.body.email){ // check xem có email hay chưa
        req.flash("error", "Vui lòng nhập email !");
        res.redirect("back");
        return;
    }
    if(!req.body.password){ // check xem có email hay chưa
        req.flash("error", "Vui lòng nhập password !");
        res.redirect("back");
        return;
    }
    next(); // middleware dùng để xác nhận xem có trường title hay chưa nếu người dùng tạo rồi thì mới cho phép đi qua bước tiếp theo
}

module.exports.forgotpassword=(req,res,next)=>{
    if(!req.body.email){ // check xem có email hay chưa
        req.flash("error", "Vui lòng nhập email !");
        res.redirect("back");
        return;
    }
    next(); // middleware dùng để xác nhận xem có trường title hay chưa nếu người dùng tạo rồi thì mới cho phép đi qua bước tiếp theo
}

module.exports.resetPassword=(req,res,next)=>{
    if(!req.body.password){ // check xem có email hay chưa
        req.flash("error", "Vui lòng nhập password !");
        res.redirect("back");
        return;
    }
    if(!req.body.confirmPassword){ // check xem có email hay chưa
        req.flash("error", "Vui lòng nhập mật khẩu xác nhận !");
        res.redirect("back");
        return;
    }
    if(req.body.password !==req.body.confirmPassword ){
        req.flash("error", "Mật khẩu xác nhận không hợp lệ !");
        res.redirect("back");
        return;
    }
    next(); // middleware dùng để xác nhận xem có trường title hay chưa nếu người dùng tạo rồi thì mới cho phép đi qua bước tiếp theo
}
