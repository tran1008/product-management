 // get socketIo
const Chat=require('../../models/chat.model.js');
const  uploadToCloudDinary=require("../../helper/uploadToCloudDinary.js")
module.exports = (res)=>{
    const userId=res.locals.user.id
    const fullName=res.locals.user.fullName
    _io.once("connection",(socket)=>{
        socket.on('CLIENT_SEND_MESSAGE', async(data) => { // Server lắng nghe socket.on
            let images=[];
            for (const imageBuffer of data.images) {
                const link=await uploadToCloudDinary(imageBuffer);
                images.push(link);
            }
            console.log(images);
            const chat=new Chat({
                user_id:userId,
                content:data.content,
                images:images
            })
            await chat.save();
            // trả về data cho client
            _io.emit('SERVER_RETURN_MESSAGE',{
                // ở đây ta thêm thuộc tính user.id bằng với my
                user_id:userId,
                fullName:fullName,
                content:data.content,
                images:images
            })   
        });
        //typing
        socket.on('CLIENT_SEND_TYPING', async(type) => { // Server lắng nghe socket.on
            socket.broadcast.emit("SERVER_RETURN_TYPING",{ // truyền thì ông A không nhận được còn lại nhận bình thường
                user_id:userId,
                fullName:fullName,
                type:type
            })
        });
    })
}