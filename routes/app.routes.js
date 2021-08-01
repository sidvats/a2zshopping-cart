const express = require("express");
const router = express.Router();
const routehandler = require('../controller/route.handler');
const auth=require('../middleware/auth');

router.get('/', routehandler.home); //homepage dashboard
router.post('/login', routehandler.loginuser); //registered admin or user can login
router.post('/register', routehandler.register); // any one can register with email and password
router.get('/product',auth, routehandler.productlist);  //displays products(to all)
router.get('/cart',auth, routehandler.cart); //cart items and place order
router.get('/logout',auth,routehandler.logout);
router.get('/logoutall',auth,routehandler.logoutall);
// router.post('/admin', routehandler.addadmin); //add admin(only admin)
// router.delete('/admin/:userid', routehandler.deladmin); //delete user/admin (only admin)
// router.post('/product', routehandler.addproduct); //add product (only admin)
// router.delete('/product', routehandler.delproduct); //delete product (only admin)

module.exports = router;