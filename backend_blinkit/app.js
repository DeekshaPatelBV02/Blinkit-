const express = require('express');
const app = express();
require('dotenv').config();

app.set('')

app.get("/",(req,res)=>{
    res.send("this is test route");
})

app.listen(8080,()=>{
    console.log("server runing");
})