const mongoose = require('mongoose');
slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const RoleSchema= mongoose.Schema({ 
    title:String,
    description:String,
    permission:{
        type:Array,
        default:[]
    },
    slug:{
         type: String,
          slug: "title",
          unique: true 
    },
    deleted:{
        type:Boolean,
        default:false,
    },
    deletedAt:Date
},{
    timestamps: true 
});
const Role = mongoose.model('Role', RoleSchema,'roles');
module.exports=Role;