module.exports.createPost=(req,res,next)=>{
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