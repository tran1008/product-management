// [GET] /admin/dashboard
const Account=require('../../models/account.model.js')
const md5=require('md5');
module.exports.index= async(req,res)=>{
    res.render('admin/pages/my-account/index.pug',{
        pageTitle:"Trang thông tin cá nhân"
    })
}
module.exports.edit= async(req,res)=>{
    res.render('admin/pages/my-account/edit.pug',{
        pageTitle:"Trang chỉnh sửa thông tin cá nhân"
    })
}

module.exports.editPatch = async (req, res) => {
    const id =res.locals.user.id
    const checkEmailExits= await Account.findOne({
        _id: {$ne: id},
        email:req.body.email,
        deleted:false
    })
    if(checkEmailExits){
        req.flash('error', `Email ${req.body.email} đã tồn tại trong hệ thống`);
    }else{
        if(req.body.password){
             req.body.password=md5(req.body.password)
        }else{
            delete req.body.password
        }
        await Account.updateOne({_id:id},req.body)
    }
    res.redirect("back");
}