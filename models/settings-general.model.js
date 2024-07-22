const mongoose = require('mongoose');
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const SettingGeneralSchema= mongoose.Schema({ 
   websiteName:String,
   thumbnail:String,
   phone:String,
   email:String,
   address:String,
   copyright:String
},{
    timestamps: true 
});
const SettingGeneral = mongoose.model('SettingGeneral', SettingGeneralSchema,'settings-general');
module.exports=SettingGeneral;