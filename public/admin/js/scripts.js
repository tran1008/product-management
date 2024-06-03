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

