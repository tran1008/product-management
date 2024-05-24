const express=require('express')
const app=express();

const port=3000;
app.set('views', './views');
app.set('views engine', 'pug');
app.get('/',(req,res)=>{
    res.send("Trang chủ");
    // res.render('index.pug',{
    //     title:"Trang chủ",
    //     message:"Đây là trang chủ bán hàng !"
    // })
})
app.get('/products',(req,res)=>{
    res.send("Trang sản phẩm");
    // res.render('product.pug',{
    //     title:"Trang chủ",
    //     product:products
    // })
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
