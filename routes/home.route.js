const router=require("express").Router();
const homeController =require("../controlles/home.controller")
const isAuth=require("../routes/auth/auth.guard")

router.get("/",isAuth.isAuth,homeController.getData)


module.exports=router


