
const SettingGeneral = require("../../models/settings-general.model")
module.exports.Setting= async(req, res, next)=>{
    const settingGeneral=await SettingGeneral.findOne({})
    res.locals.settingGeneral=settingGeneral; // sử dụng biến này trong một file khác
    next();
}