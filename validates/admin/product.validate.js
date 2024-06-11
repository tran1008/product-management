module.exports.createPost=(req,res,next)=>{
    if(!req.body.title){ // check xem có tạo tiêu đề hay chưa
        req.flash("error", "Vui lòng nhập tiêu đề !");
        res.redirect("back");
        return;
    }
    next(); // middleware dùng để xác nhận xem có trường title hay chưa nếu người dùng tạo rồi thì mới cho phép đi qua bước tiếp theo
}