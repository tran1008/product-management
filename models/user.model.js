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