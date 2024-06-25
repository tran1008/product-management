const Role=require('../../models/role.model.js')
const systemConfig=require('../../config/system.js')
module.exports.index=async(req,res)=>{
    let find={
        deleted:false,
    }
    const records = await Role.find(find)
    res.render('admin/pages/roles/index.pug', {
        pageTitle: "Nhóm quyền",
        records:records,
    })
}

module.exports.create = async (req, res) => { // phần này dùng để post data và lưu vào trong database và hiện thị lại giao diện
    // console.log(req.file)
    res.render('admin/pages/roles/create.pug', {
        pageTitle: "Tạo Nhóm Quyền ",
    })
}
module.exports.createPost = async(req, res)=>{
    console.log(req.body)
    const record =new Role(req.body)
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
module.exports.edit = async (req, res) => {
    const id =req.params.id;
    let find ={
        _id:id,
        deleted:false
    }
    const data= await Role.findOne(find)
    res.render('admin/pages/roles/edit.pug', {
        pageTitle: "Sửa Nhóm Quyền",
        data:data
    })
}

module.exports.editPatch = async (req, res) => {
    try {
        const id =req.params.id;
        await Role.updateOne({_id:id},req.body)
        req.flash('success', 'Cập nhật nhóm quyền thành công');
    } catch (error) {
        req.flash('error', 'Cập nhật nhóm quyền thất bại ');
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
module.exports.permission=async(req,res)=>{
    let find={
        deleted:false,
    }
    const records = await Role.find(find) // tìm tất cả những bản records
    res.render('admin/pages/roles/permission.pug', {
        pageTitle: "Phân quyền",
        records:records,
    })
}

// for of là lặp qua từng phần tử của mảng

module.exports.permissionPatch=async(req,res)=>{
    try {
        const permissions= JSON.parse(req.body.permissions)// chuyển từ dạng string về dạng javascript object
        //  console.log(permissions)
         for (const item of permissions) {
            const id =item.id;
            await Role.updateOne({_id:id},{permission:item.permissons})
         }
        req.flash('success', 'Cập nhật phân quyền thành công');
    } catch (error) {
        req.flash('error', 'Cập nhật phân quyền thất bại ');
    }
    res.redirect("back");
}