const Role=require('../../models/role.model.js')
const Account=require('../../models/account.model.js')
const systemConfig=require('../../config/system.js')
const md5=require('md5');
module.exports.index=async(req,res)=>{
    const find ={
        deleted:false
    }
    const records=await Account.find(find).select("-password -token")
    for (const record of records) { // lặp qua từng record
        const role =await Role.findOne({
            _id:record.role_id,
            deleted:false
        })
        record.role=role; // add thêm key role
    }
    res.render('admin/pages/accounts/index.pug', {
        pageTitle: "Danh sách tài khoản",
        records:records
    })
}
module.exports.create=async(req,res)=>{
    const find={
        deleted:false
    }
    const data = await Role.find(find)
    res.render('admin/pages/accounts/create.pug', {
        pageTitle: "Thêm mới một tài khoản",
        data:data,
    })
}
module.exports.createPost=async(req,res)=>{
    // check liệu có trùng email hay không
    const checkEmailExits= await Account.findOne({
        email:req.body.email,
        deleted:false
    })
    if(checkEmailExits){
        req.flash('error', `Email ${req.body.email} đã tồn tại trong hệ thống`);
        res.redirect("back")
    }else{
        req.body.password=md5(req.body.password)
        const record = new Account(req.body)   
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}
module.exports.edit = async (req, res) => {
    const id =req.params.id;
    let find ={
        _id:id,
        deleted:false
    }
    try {
        const data= await Account.findOne(find)
        const roles =await Role.find({ // tìm những bản ghi có nhóm quyền là quản trị viên và nội dung
            deleted:false
        })
        res.render('admin/pages/accounts/edit.pug', {
            pageTitle: "Chỉnh sửa tài khoản",
            data:data,
            roles:roles
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}
module.exports.editPatch = async (req, res) => {
    const id =req.params.id
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