// [GET] /admin/setting/general
const SettingGeneral=require('../../models/settings-general.model.js')
module.exports.setting= async(req,res)=>{
    const settingGeneral=await SettingGeneral.findOne({})
    res.render('admin/pages/setting/general.pug',{
        pageTitle:"Trang cài đặt chung",
        settingGeneral:settingGeneral
    })
}
module.exports.settingPatch= async(req,res)=>{
   const settingGeneral= await SettingGeneral.findOne({});
   if(settingGeneral){
        await settingGeneral.updateOne({
            _id:settingGeneral.id
        },req.body)
   }else{
    const record=new SettingGeneral(req.body)
    await record.save();
   }
   res.redirect("back")
}