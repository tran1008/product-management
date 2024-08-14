const mongoose = require('mongoose');
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const ChatSchema= mongoose.Schema({ 
    user_id:String,
    // room_chat_id:String,
    content:String,
    images:Array,
    deleted:{
        type:Boolean,
        default:false,
    },
    deletedAt:Date
},{
    timestamps: true 
});
const Chat = mongoose.model('Chat', ChatSchema,'chats');
module.exports=Chat;