// chức năng gửi yêu cầu
const btnListAddFriend=document.querySelectorAll("[btn-add-friend]");
if(btnListAddFriend.length >0){
    btnListAddFriend.forEach(button =>{
        button.addEventListener("click",(e)=>{
            button.closest(".box-user").classList.add("add")
            const UserId=button.getAttribute("btn-add-friend")
            socket.emit("CLIENT_ADD_FRIEND",UserId)
            // console.log(UserId)
        })
    })
}
// hết chức năng gửi yêu cầu    
const btnListCancelFriend=document.querySelectorAll("[btn-cancel-friend]");
if(btnListCancelFriend.length >0){
    btnListCancelFriend.forEach(button =>{
        button.addEventListener("click",(e)=>{
            button.closest(".box-user").classList.remove("add")
            const UserId=button.getAttribute("btn-cancel-friend")
            socket.emit("CLIENT_CANCEL_FRIEND",UserId)
            // console.log(UserId)
        })
    })
}
// chức năng xóa lời mời kết bạn
const btnListRefuseFriend=document.querySelectorAll("[btn-refuse-friend]");
if(btnListRefuseFriend.length >0){
    btnListRefuseFriend.forEach(button =>{
        button.addEventListener("click",(e)=>{
            button.closest(".box-user").classList.add("refuse")
            const UserId=button.getAttribute("btn-refuse-friend")
            socket.emit("CLIENT_REFUSE_FRIEND",UserId)
            // console.log(UserId)
        })
    })
}

// chức năng  chấp nhận lời mời kết bạn
const btnListAcceptFriend=document.querySelectorAll("[btn-accept-friend]");
if(btnListAcceptFriend.length >0){
    btnListAcceptFriend.forEach(button =>{
        button.addEventListener("click",(e)=>{
            button.closest(".box-user").classList.add("accept")
            const UserId=button.getAttribute("btn-accept-friend")
            socket.emit("CLIENT_ACCEPT_FRIEND",UserId)
            // console.log(UserId)
        })
    })
}
const badeUsersAccept=document.querySelector("[badge-users-accept]");
if(badeUsersAccept){
    const UserId=badeUsersAccept.getAttribute(["badge-users-accept"]);
    socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND",(data)=>{
        // console.log(data)
        if(UserId===data.UserId){
            badeUsersAccept.innerHTML=data.acceptFriendLength;
        }
    })
}