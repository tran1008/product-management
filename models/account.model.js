const mongoose = require('mongoose');
const generate = require('../helper/generate.js')
// dạng Shema này dùng để lấy từng trường trong cơ sở dữ liệu
const AccountSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date
}, {
    timestamps: true
});
const Account = mongoose.model('Account', AccountSchema, 'accounts');
module.exports = Account;