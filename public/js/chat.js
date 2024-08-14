import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
    multiple: true,
    maxFileCount: 6
});
const formSendData = document.querySelector(".chat .inner-form")
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn chặn sự kiện mặc định xảy ra
        const content = e.target.elements.content.value;
        const images = upload.cachedFileArray;
        console.log(images)
        if (content || images.length > 0) {
            socket.emit("CLIENT_SEND_MESSAGE", {
                content: content,
                images: images
            });
            e.target.elements.content.value = "";
            upload.resetPreviewPanel(); // clear all selected images
            socket.emit("CLIENT_SEND_TYPING", "hidden")
        }
    })
}

// lắng nghe sự kiện bên phía server trả về
socket.on('SERVER_RETURN_MESSAGE', (data) => {
    // getAtribute là lấy giá trị của cái thuộc tính đó
    const MyId = document.querySelector("[my-id]").getAttribute("my-id")
    const body = document.querySelector(".chat .inner-body")
    const div = document.createElement("div")
    const bodyTyping = document.querySelector(".chat .inner-list-typing")
    let htmlfullName = "";
    let htmlContent = "";
    let htmlImages = "";
    if (MyId == data.user_id) {
        div.classList.add("inner-outgoing")
    } else {
        htmlfullName = `<div class="inner-name">${data.fullName}</div>`
        div.classList.add("inner-incoming")
    }
    if (data.content) {
        htmlContent = `<div class="inner-content">${data.content}</div>`
    }
    if (data.images.length >0) { // tại sao ở đây ta cần check thuộc tính length lớn hơn 0 là bởi vì nếu data.images=[] thì nó vẫn ra một cái thẻ div điều này dẫn đến lỗi chương trình khá nặng nề
        htmlImages += `<div class="inner-images">`
        for (const image of data.images) {
            htmlImages+=`<img src=${image}">`
        }
        htmlImages +=`</div>`
    }
    div.innerHTML = `
        ${htmlfullName}
        ${htmlContent}
        ${htmlImages}
    `;
    body.insertBefore(div,bodyTyping);
    body.scrollBottom = 0;
    const bodyChat = document.querySelector(".chat .inner-body")
    if (bodyChat) {
        bodyChat.scrollBottom = 0;
    }
    const gallery = new Viewer(bodyChat);
})
// Show Icon Chat
// Show PopUp
const buttonIcon = document.querySelector('.button-icon')
if (buttonIcon) {
    const tooltip = document.querySelector('.tooltip')
    Popper.createPopper(buttonIcon, tooltip)
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('show')
    }
}
// End Show Popup
//Insert Icon To Input
var timeOut;
const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show") // ở đây là một cái cờ để biết ông này ông đang gõ
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden")
    }, 3000)
}
const emojiPicker = document.querySelector('emoji-picker');
if (emojiPicker) {
    const Input = document.querySelector(".chat .inner-form input[name='content']")
    emojiPicker.addEventListener('emoji-click', (event) => {
        const Icon = event.detail.unicode;
        Input.value = Input.value + Icon
        const end = Input.value.length
        Input.setSelectionRange(end, end);
        Input.focus();
        showTyping();
    });
    Input.addEventListener("keyup", () => {
        showTyping();
    })
}
//End Insert Icon To Input
// End Show Icon Chat

//SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
    // thuộc tính chúng ta tự định nghĩa thì luôn nằm trong dấu ngoặc vuông
    // ô input khi mà chúng ta không focus vào nữa thì mặc định nó sẽ luôn quay về đầu.
    socket.on('SERVER_RETURN_TYPING', (data) => {
        console.log(data)
        const existTyping = elementListTyping.querySelector(`[user-id="${data.user_id}"]`)
        const body = document.querySelector(".chat .inner-body")
        if (!existTyping) {
            if (data.type == "show") {
                const div = document.createElement("div");
                div.classList.add("box-typing");
                div.setAttribute("user-id", data.user_id);
                div.innerHTML = `
                    <div class="inner-name">${data.fullName} </div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `
                elementListTyping.appendChild(div);
                body.scrollTop = body.scrollHeight;
            }
        } else {
            const BoxTypingRemove = elementListTyping.querySelector(`[user-id="${data.user_id}"]`)
            if (BoxTypingRemove) {
                elementListTyping.removeChild(BoxTypingRemove);
            }
        }
    })
}

//END SERVER_RETURN_TYPING

// Viewerjs
const bodyChatPreviewImage = document.querySelector(".chat .inner-body")
if(bodyChatPreviewImage){
    const gallery = new Viewer(bodyChatPreviewImage);
}