require('dotenv').config()
const express=require('express');
const app=express();
const port=process.env.PORT || 5000;
const routes=require('./routes/app.routes');
const mongoose=require("mongoose");
const bodyparser=require('body-parser');
const cookieParser = require('cookie-parser');
mongoose.connect('mongodb+srv://sid-practice:GgTSDLiGbBjrfbnm@cluster0.l8k5m.mongodb.net/shoppingcart?retryWrites=true&w=majority',
                {
                    useNewUrlParser:true,
                    useUnifiedTopology:true,
                    useCreateIndex: true 
                }).then(()=>{
                    console.log("Db connected");
                }).catch((err)=>{
                    if(err) throw err;
                });
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));


app.use(routes);

app.use((req,res)=>{
    res.status(404).render('404');
})

app.listen(port,(err)=>{
    if(err) throw err;
})