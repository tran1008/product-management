const express=require('express')
// import dotenv from dotenv
// dotenv.config()
require("dotenv").config();
const app=express();

const port=process.env.PORT;
const route=require("./routes/client/index.route")
app.set('views', './views');
app.set('views engine', 'pug');
route(app)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
