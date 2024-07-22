// cập nhật danh sách sản phẩm
const inputsQuantity=document.querySelectorAll("input[name='quantity']")
if(inputsQuantity){
    inputsQuantity.forEach(input =>{
        input.addEventListener("change",(e)=>{
            const productId =input.getAttribute("product-id");
            const quantity=e.target.value // lấy ra được số lượng
            // console.log(productId)
            // console.log(quantity)
            // điều hướng sang một trang khác
            window.location.href=`/cart/update/${productId}/${quantity}`;
        })
    })
}
// console.log("Oke  hiệu")
//  hết phần cập nhật danh sách sản phẩm