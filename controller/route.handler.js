//home,login,register,productlist,addadmin,addproduct,deladmin,delproduct
const product = require('../models/productmodel');
const user = require('../models/usermodel');
const bcrypt = require('bcrypt');
///////////////////home dashboard
const home = (req, res) => {
    var error = "";
    var success = "";
    var errorlogin = "";
    res.render('home', { error, success, errorlogin });
}
/////////////////////login functionality
const loginuser = async (req, res) => {
    const userdata = new user(req.body);
    var error = "";
    var success = "";
    var errorlogin = "";

    try {
        const result = await user.findOne({ email: userdata.email });
        const ismatch = await bcrypt.compare(userdata.password, result.password); //compare need first arg as received pass i.e plain text and 2nd arg as hashed text
        if (ismatch) {
            const token = await result.generateauthtoken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 500000),
                httpOnly: true
            });
            res.redirect('/product');
        }
        else {
            errorlogin = "Invalid Login Credentials";
            res.render('home', { success, error, errorlogin });
        }
    } catch (e) {
        errorlogin = "Invalid Login Credentials";
        res.render('home', { success, error, errorlogin });
        res.status(400);
    }
}
///////////////////////register a user
const register = async (req, res) => {
    hashedpassword = bcrypt.hashSync(req.body.password, 10);
    const userdata = new user({
        email: req.body.email,
        password: hashedpassword
    })
    var error = "";
    var success = "";
    var errorlogin = "";
    const token = await userdata.generateauthtoken();  //a middleware to generate token defined in model
    user.find({ email: userdata.email }).then((result) => {
        if (result.length > 1) {
            error = "User with provided Email already registered";
            res.render('home', { success, error, errorlogin });
        }
        else {
            userdata.save().then((result) => {
                success = "User Registered ! Login to continue";
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 500000),
                    httpOnly: true
                });
                res.render('home', { success, error, errorlogin });
            }).catch((err) => {
                error = "User with provided Email already registered";
                res.render('home', { success, error, errorlogin });
                console.log("------------------------------\nError Occured log = \n", err);
            })
        }
    })
}
///////////////////////////////////show productslist
const productlist = (req, res) => {
    product.find({}).then((result) => {
        res.render('shoppinglist', { products: result });
    })
}
const cart = (req, res) => { 
    res.render('cart');
}
const logout =async (req, res) => { 
    try{
        req.user.tokens = req.user.tokens.filter((value)=>{
            return value.token !== req.token ;
        })
        res.clearCookie('jwt');
        await req.user.save();
        res.redirect('/');
    }catch(e){
        console.log("logout error = ",e);
        res.status(500);
    }
}
const logoutall =async (req, res) => { 
    try{
        req.user.tokens=[];
        res.clearCookie('jwt');
        await req.user.save();
        res.redirect('/');
    }catch(e){
        console.log("logout error =",e);
    }
}
const addadmin = (req, res) => {

}
const addproduct = (req, res) => {

}
const deladmin = (req, res) => {

}
const delproduct = (req, res) => {

}
module.exports = {
    home,
    loginuser,
    register,
    productlist,
    addadmin,
    addproduct,
    deladmin,
    delproduct,
    cart,
    logout,
    logoutall
}