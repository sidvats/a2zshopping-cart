//home,login,register,productlist,addadmin,addproduct,deladmin,delproduct
const product = require('../models/productmodel');
const user = require('../models/usermodel');
///////////////////home dashboard
const home = (req, res) => {
    var error = "";
    var success = "";
    var errorlogin="";
    res.render('home', { error, success,errorlogin });
}
/////////////////////login functionality
const loginuser = (req, res) => {
    const userdata=new user(req.body);
    var error = "";
    var success = "";
    var errorlogin="";
    user.findOne({email:userdata.email}).then((result)=>{
        if( result.password == userdata.password )
        {
            res.render('shoppinglist');
        }
        else{
            errorlogin="Invalid Login Credentials";
            
            res.render('home',{success,error,errorlogin});
        }
    })
}
///////////////////////register a user
const register = (req, res) => {
    const userdata = new user(req.body);
    var error = "";
    var success = "";
    var errorlogin="";
    //console.log("USERDATA = ", req.body);
    user.find({ email: userdata.email }).then((result) => {
        if (result.length > 1) {
            error = "User with provided Email already registered";
            res.render('home', { success,error,errorlogin });
        }
        else {
            userdata.save().then((result) => {
                success = "User Registered ! Login to continue";
                res.render('home', { success,error,errorlogin });
            }).catch((err) => {
                error = "User with provided Email already registered";
                res.render('home', { success,error,errorlogin });
                console.log("------------------------------\nError Occured log = \n", err);
            })
        }
    })
}
///////////////////////////////////show productslist
const productlist = (req, res) => {

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
    delproduct
}