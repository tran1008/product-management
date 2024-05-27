const buttonStatus=document.querySelectorAll("[button-status]");
console.log(buttonStatus);
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