const Chat=require('../../models/chat.model.js');
const User = require('../../models/user.model.js');
const chatSocket=require('../../socket/client/chat.socket.js')
module.exports.index=async (req,res)=>{
    // end socket io
    // lấy data từ database
    chatSocket(res)
    const chats=await Chat.find({
        deleted:false
    })
    for (const chat of chats) {
        // ứng với mỗi user thì add thêm key là infor user cho từng collection chat
        const infoUser=await User.findOne({
            _id:chat.user_id
        }).select("fullName")
        chat.infoUser=infoUser;
    }
    res.render('client/pages/chat/index.pug',{
        pageTitle:"Chat",
        chats:chats
    })
}