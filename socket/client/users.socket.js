 // get socketIo
 const User=require("../../models/user.model")
module.exports = (res)=>{
     _io.once("connection",(socket)=>{
            // tính năng gửi yêu cầu kết bạn
         socket.on('CLIENT_ADD_FRIEND', async(UserId) => { // Server lắng nghe socket.on
            const myUserId= res.locals.user.id
            // console.log(myUserId) // Id của ông a
            // console.log(UserId) // Id của ông B
            // xử lý logic ở đây
             // thêm id của ông A vào acceptFriends của ông B
             // check xem liệu trước đó đã có id của ông A nào được lưu vào hay chưa
             const exitsIdAinB=await User.findOne({
                _id:UserId,
                acceptFriends:myUserId // kiểm tra xem trong mảng acceptFriends đó đã có tồn tại Id của ông A hay chưa
             })
             if(!exitsIdAinB){
                await User.updateOne({
                    _id:UserId
                },{
                    $push:{acceptFriends:myUserId}
                })
             }
             // thêm id của ông B vào requestFriends của ông A
             const exitsIdBinA=await User.findOne({
                _id:myUserId,
                requestFriends:UserId // kiểm tra xem trong mảng acceptFriends đó đã có tồn tại Id của ông A hay chưa
             })
             if(!exitsIdBinA){
                await User.updateOne({
                    _id:myUserId
                },{
                    $push:{requestFriends:UserId}
                })
             }
            // kết thúc xử lý logic ở đây
            // lấy độ dài acceptFriends của ô B và trả về cho ô B
            const infoUserB=await User.findOne({
               _id:UserId
               })
               const acceptFriendLength=infoUserB.acceptFriends.length
               socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
               UserId:UserId,
               acceptFriendLength:acceptFriendLength
            })
            
         });
         //tính năng hủy yêu cầu kết bấn
         socket.on('CLIENT_CANCEL_FRIEND', async(UserId) => { // Server lắng nghe socket.on
            const myUserId= res.locals.user.id
            // console.log(myUserId) // Id của ông a
            // console.log(UserId) // Id của ông B
            // xử lý logic ở đây
             // thêm id của ông A vào acceptFriends của ông B
             // check xem liệu trước đó đã có id của ông A nào được lưu vào hay chưa
             const exitsIdAinB=await User.findOne({
                _id:UserId,
                acceptFriends:myUserId // kiểm tra xem trong mảng acceptFriends đó đã có tồn tại Id của ông A hay chưa
             })
             if(exitsIdAinB){
                await User.updateOne({
                    _id:UserId
                },{
                    $pull:{acceptFriends:myUserId}
                })
             }
             // thêm id của ông B vào requestFriends của ông A
             const exitsIdBinA=await User.findOne({
                _id:myUserId,
                requestFriends:UserId // kiểm tra xem trong mảng acceptFriends đó đã có tồn tại Id của ông A hay chưa
             })
             if(exitsIdBinA){
                await User.updateOne({
                    _id:myUserId
                },{
                    $pull:{requestFriends:UserId}
                })
             }
            // kết thúc xử lý logic ở đây
            const infoUserB=await User.findOne({
               _id:UserId
            })
            const acceptFriendLength=infoUserB.acceptFriends.length
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",{
               UserId:UserId,
               acceptFriendLength:acceptFriendLength
            })
         });
         // tính năng từ chối lời mời kết bạn
         socket.on('CLIENT_REFUSE_FRIEND', async(UserId) => { // Server lắng nghe socket.on
            const myUserId= res.locals.user.id
            // console.log(myUserId) // Id của ông a
            // console.log(UserId) // Id của ông B
            // xử lý logic ở đây
             // xóa id của ông A vào acceptFriends của ông B
             // check xem liệu trước đó đã có id của ông A nào được lưu vào hay chưa
             const exitsIdAinB=await User.findOne({
                _id:myUserId,
                acceptFriends:UserId // kiểm tra xem trong mảng acceptFriends đó đã có tồn tại Id của ông A hay chưa
             })
             if(exitsIdAinB){
                await User.updateOne({
                    _id:myUserId
                },{
                    $pull:{acceptFriends:UserId}
                })
             }
             // thêm id của ông B vào requestFriends của ông A
             const exitsIdBinA=await User.findOne({
                _id:UserId,
                requestFriends:myUserId // kiểm tra xem trong mảng acceptFriends đó đã có tồn tại Id của ông A hay chưa
             })
             if(exitsIdBinA){
                await User.updateOne({
                    _id:UserId
                },{
                    $pull:{requestFriends:myUserId}
                })
             }
            // kết thúc xử lý logic ở đây
         });
         // tính năng chấp nhận lời mời kết bạn
         socket.on('CLIENT_ACCEPT_FRIEND', async(UserId) => { // Server lắng nghe socket.on
            const myUserId= res.locals.user.id
            // console.log(myUserId) // Id của ông a
            // console.log(UserId) // Id của ông B
            // xử lý logic ở đây
            // thêm {user_id,room_chat_id} của A vào friendList của B
             // xóa id của ông A trong acceptFriends của ông B
             // check xem liệu trước đó đã có id của ông A nào được lưu vào hay chưa
             const exitsIdAinB=await User.findOne({
                _id:myUserId,
                acceptFriends:UserId // kiểm tra xem trong mảng acceptFriends đó đã có tồn tại Id của ông A hay chưa
             })
             if(exitsIdAinB){
                await User.updateOne({
                    _id:myUserId
                },{
                    $push:{
                     friendList:{
                        user_id:UserId,
                        room_chat_id:" "
                     }
                    },
                    $pull:{acceptFriends:UserId}
                })
             }
             //thêm {user_id,room_chat_id} của B vào friendList của A
             // xóa id của ông B trongrequestFriends của ông A
             const exitsIdBinA=await User.findOne({
                _id:UserId,
                requestFriends:myUserId // kiểm tra xem trong mảng acceptFriends đó đã có tồn tại Id của ông A hay chưa
             })
             if(exitsIdBinA){
                await User.updateOne({
                    _id:UserId
                },{
                  $push:{
                     friendList:{
                        user_id:myUserId,
                        room_chat_id:" "
                     }
                    },
                    $pull:{requestFriends:myUserId}
                })
             }
            // kết thúc xử lý logic ở đây
         });
     })
 }