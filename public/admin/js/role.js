//Permission
const tablePermisson=document.querySelector("[table-permission]")
// console.log(tablePermission)
if(tablePermisson){
    const buttonSumit=document.querySelector("[button-submit]")
    buttonSumit.addEventListener("click",()=>{
        let permissons=[];
        const rows=tablePermisson.querySelectorAll("[data-name]"); // lấy tất cả các ô input có thuộc tính là dataname
        rows.forEach(row =>{
            const name =row.getAttribute("data-name"); // lấy thuộc tính thì ko cần giấu ngoặc vuông
            const inputs=row.querySelectorAll("input");
            if(name == "id"){
                inputs.forEach((input,index) =>{
                    const id =input.value;
                    permissons.push({  // dạng object gồm key và value
                        id:id,
                        permissons:[]
                    })
                })
            }else{
                inputs.forEach((input,index)=>{
                    const checked=input.checked
                    if(checked){
                        permissons[index].permissons.push(name);
                    }
                })
            }
            // console.log(name) đã xong giờ submit qua form thui
        });
        console.log(permissons)
        if(permissons.length > 0){ // check nếu có nhóm quyền rùi thì mới tiến hành đẩy data chuyển từ java script object 
            const formChangePermission=document.querySelector("#form-change-permissions")
            if(formChangePermission){
                const inputPermissions=formChangePermission.querySelector("input[name='permissions']")
                inputPermissions.value=JSON.stringify(permissons);
                formChangePermission.submit();
            }
        } 
    });
}
// End Permission
// Permission Default Value
// const dataRecord=document.querySelector("[data-records]");
// if(dataRecord){
//     const records=JSON.parse(dataRecord.getAttribute("data-records"))
//     console.log(records);
//     records.forEach((record,index) =>{
//         const permissions=record.permission;
//         permissions.forEach(permission =>{
//             const row=tablePermisson.querySelector(`[data-name ="${permission}"]`); 
//             const input=row.querySelectorAll("input")[index]
//             input.checked=true;  
//         })
//     })
// }

// //Permisson Default Value
const dataRecord=document.querySelector("[data-records]")
if(dataRecord){
    const records=JSON.parse(dataRecord.getAttribute("data-records")) // chuyển từ dạng string về dạng JavaScript Object
    records.forEach((record,index) =>{ // lấy ra được các bản ghi
        const permissions=record.permission;
        permissions.forEach(permission=>{
            const rows=document.querySelector(`[data-name="${permission}"]`)
            const input =rows.querySelectorAll("input")[index];
            input.checked=true;
        })
    })
    console.log("------------")
}