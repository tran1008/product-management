const User=require('../../models/user.model')
// [GET] /users/not-friend
const userSocket=require('../../socket/client/users.socket.js')
module.exports.notFriend=async (req,res)=>{
    userSocket(res)
    const userId=res.locals.user.id
    const myUser=await User.findOne({
        _id:userId
    })
    const requestFriends=myUser.requestFriends
    const acceptFriends=myUser.acceptFriends
    const users=await User.find({
        $and:[
            {
                _id:{ $ne:userId },
            },
            {
                _id:{$nin:requestFriends }, 
            },
            {
                _id:{$nin:acceptFriends },
            },
        ],
        status:"active",
        deleted:false
    }).select("id avatar fullName")
    res.render('client/pages/users/not-friend.pug',{
        pageTitle:"Trang danh sách bạn bè",
        users:users
    })
}

module.exports.request=async (req,res)=>{
    userSocket(res)
    const userId=res.locals.user.id
    const myUser=await User.findOne({
        _id:userId
    })
    const requestFriends=myUser.requestFriends
    const users=await User.find({
        _id:{$in:requestFriends},
        status:"active",
        deleted:false
    }).select("id avatar fullName")
    res.render('client/pages/users/request.pug',{
        pageTitle:"Lời mời đã gửi",
        users:users
    })
}

module.exports.accept=async (req,res)=>{
    userSocket(res)
    const userId=res.locals.user.id
    const myUser=await User.findOne({
        _id:userId
    })
    const acceptFriends=myUser.acceptFriends
    const users=await User.find({
        _id:{$in:acceptFriends},
        status:"active",
        deleted:false
    }).select("id avatar fullName")
    res.render('client/pages/users/accept.pug',{
        pageTitle:"Lời mời đã nhận",
        users:users
    })
}
