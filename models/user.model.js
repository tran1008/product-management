const mongoose = require('mongoose');
const generate = require('../helper/generate.js')
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const UserSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: {
        type:String,
        default:"active"
    },
    requestFriends:Array,  // những người mà ông A đã gửi kết bạn
    acceptFriends:Array, // những ngưỡi đã kết bạn với ông A
    friendList:[ // danh sách kết bạn với ô A
        {
            user_id:String,
            room_chat_id:String 
        }
    ],
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
}, {
    timestamps: true
});
const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;