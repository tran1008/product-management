const buttonStatus=document.querySelectorAll("[button-status]");
// console.log(buttonStatus);
const url= new URL(window.location.href)
console.log(url.href)
if(buttonStatus.length >0){
    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=> {
            const status=button.getAttribute("button-status");
            console.log(status) // lấy ra được thuộc tính đã được định nghĩa trong button
            if(status){
                url.searchParams.set("status",status) // function sao lại có dấu bằng ở đây chấm hỏi luôn á 
            }else{
                url.searchParams.delete("status")
            }
            window.location.href=url.href;
        })
    })
}
// form search
const formSearch=document.querySelector("#form-search");
if(formSearch){
    const url= new URL(window.location.href)
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const keyword=e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword",keyword) // function sao lại có dấu bằng ở đây chấm hỏi luôn á 
        }else{
            url.searchParams.delete("keyword")
        }
        window.location.href=url.href;
    })
}

//button-pagination
const buttonPagination=document.querySelectorAll("[button-pagination]")
if(buttonPagination){
    const url= new URL(window.location.href)
    buttonPagination.forEach(button=>{
        button.addEventListener("click",(e)=>{
            const page=button.getAttribute("button-pagination");
            //console.log(page);
            if(page){
                url.searchParams.set("page",page) // function sao lại có dấu bằng ở đây chấm hỏi luôn á 
            }
            window.location.href=url.href
        })
    })
}

// check box multi
const checkBoxMulti=document.querySelector("[checkbox-multi]");
if(checkBoxMulti){
    const inputCheckAll=checkBoxMulti.querySelector("input[name='checkall']");  // lấy ô checkbox check all
    const inputsID=checkBoxMulti.querySelectorAll("input[name='id']");   // lấy ô checkbox check từng cái
    // console.log(inputCheckAll);
    // console.log(inputsID);
    // xử lý sự kiện cho việc checkall
    inputCheckAll.addEventListener("click",(e)=>{
        if(inputCheckAll.checked==true){ // trong ô checkbox nó có thuộc tính là checked
            inputsID.forEach(input=>{
                input.checked=true
            })
        }else{
            inputsID.forEach(input=>{
                input.checked=false
            })
        }
    })
   inputsID.forEach(input=>{ // lặp qua từng ô checkbox và bắt sự kiện click của nó
    input.addEventListener("click",(e)=>{
        const countChecked=document.querySelectorAll("input[name='id']:checked").length;
        // console.log(countChecked);
        if(countChecked===inputsID.length){
            inputCheckAll.checked=true
        }else{
            inputCheckAll.checked=false
        }
    })
   })
}
//end check box multi
// bắt đầu gửi form đi
const formChangeMulti=document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        // console.log(e)
        const checkBoxMulti=document.querySelector("[checkbox-multi]");
        const inputChecked=checkBoxMulti.querySelectorAll("input[name='id']:checked");
        const typeChange=e.target.elements.type.value;
        // console.log(typeDelete);
        if(typeChange=="delete-all"){
            const isConfirm=confirm("Bạn có chắc rằng muốn xóa những sản phẩm này");
            if(!isConfirm){
                return;
            }
        }
        if(inputChecked.length>0){
            let ids=[];
            const inputIDs=document.querySelector("input[name='ids']")
            inputChecked.forEach(input=>{
                const id=input.value;
                if(typeChange == "change-position"){
                    const position=input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}+${position}`)
                }else{
                    ids.push(id); // lấy ra được một mảng id
                }
            })
            // console.log(ids.join(", "));  // convert nó về dạng string
            inputIDs.value=ids.join(", ")
            formChangeMulti.submit();
        }else{
            alert('Vui lòng chọn ít nhất một bản ghi');
        }
    })
}

const showAlert=document.querySelector("[show-alert]"); 
if(showAlert){ // lấy ra thẻ div
    const time=parseInt(showAlert.getAttribute("data-time"));
    const closeAlert=showAlert.querySelector("close-alert")
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    },time);
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden")
    })
}
// Preview an image before it is uploaded
const uploadImage=document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput=document.querySelector("[upload-image-input]")
    const uploadImagePreview=document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change",(e)=>{
        console.log(e)
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
        }
    })
}

// sortSelect
const sort=document.querySelector("[sort]")
if(sort){
    let url= new URL(window.location.href) //lấy url hiện tại
    const sortSelect=sort.querySelector("[sort-select]") // từ element cha tiến hành query đến thuộc tính đã được định nghĩa
    const sortClear=sort.querySelector("[sort-clear]")
    sortSelect.addEventListener("change",(e)=>{
        const value=e.target.value;
        // console.log(value.split("-")); // hàm split dùng dể truyền từ dạng string về các phần tử của mảng và lưu vào một mảng
        let [sortKey,sortValue]=value.split("-")
        url.searchParams.set("sortKey",sortKey)
        url.searchParams.set("sortValue",sortValue)
        window.location.href=url.href; // redirect về trang mới sau khi đã truyền prams vào
    });
    sortClear.addEventListener("click",()=>{
        url.searchParams.delete("sortKey")
        url.searchParams.delete("sortValue")
        window.location.href=url.href; // redirect về trang cũ sau khi đã xóa 2 key đi
    })
    // thêm selected cho option nếu selected=true thì nó sẽ mặc định chọn cái ô đó
    const sortKey=url.searchParams.get("sortKey") // lấy từ prams xuống lại
    const sortValue=url.searchParams.get("sortValue") // lấy từ prams xuống lại
    console.log(sortKey);
    console.log(sortValue);
    if(sortKey && sortValue){
        const string= `${sortKey}-${sortValue}`
        const optionSelected=sortSelect.querySelector(`option[value='${string}']`);
        optionSelected.setAttribute("selected",true);
    }
}
