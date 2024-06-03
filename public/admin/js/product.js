// console.log("Oke men")
// change status
// một dấu bằng là phép gán còn 2 dấu bằng là so sánh
// các thẻ a đang bắt sự kiện javascript cho nó
// tạo form giả và gửi lên sau đó cập nhật dữ liệu vào trong database
const buttonChangeStatus=document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length>0){
    const formChangeStatus=document.querySelector("#form-change-status")
    const path=formChangeStatus.getAttribute("data-path")
    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            const statusCurrent=button.getAttribute("data-status");
            const id=button.getAttribute("data-id");
            let statusChange= statusCurrent == "active" ? "inactive" : "active";
            const action=path+ `/${statusChange}/${id}?_method=PATCH`
            formChangeStatus.action=action;
            formChangeStatus.submit();
        })
    })
}

// Delete item
const buttonDelete=document.querySelectorAll("[button-delete")
if(buttonDelete.length>0){
    const formDeleteItem=document.querySelector("#form-delete-item")
    const path=formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(button =>{
        button.addEventListener("click",()=>{
            const isConfirm=confirm("Bạn có chắc muốn xóa sản phẩm này hay không !")
            if(isConfirm){
                const id=button.getAttribute("data-id");
                const action=`${path}/${id}?_method=DELETE`
                formDeleteItem.action=action;
                formDeleteItem.submit();
            }
        })
    })
}
// End Delete item

const uploadImage=document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput=document.querySelector("[upload-image-input]");
    const uploadImagePreview=document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change",(e)=>{
        const file=e.target.file;
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file)
        }
    });
}
