const router=require("express").Router();
const bodyparser=require("body-parser");
const check = require('express-validator').check;
const signupController =require("../controlles/auth.contoller")
const isNotAuth=require("../routes/auth/auth.guard")

router.get("/signup",isNotAuth.isNotAuth,signupController.getSignup)

router.post("/signup",isNotAuth.isNotAuth,bodyparser.urlencoded({ extended: false }),
check("username").not().isEmpty().withMessage("username is required"),
check("email").not().isEmpty().withMessage("email is required").isEmail().withMessage("invalid email"),
check("password").not().isEmpty().withMessage("password is required").isLength({min:6}).withMessage("password should be at least 6"),
signupController.postSignup)

router.get("/login",isNotAuth.isNotAuth,signupController.getlogin)

router.post("/login",isNotAuth.isNotAuth,bodyparser.urlencoded({ extended: false }),
check("email").not().isEmpty().withMessage("email is required").isEmail().withMessage("invalid email"),
check("password").not().isEmpty().withMessage("password is required").isLength({min:6}).withMessage("password should be at least 6")
,signupController.postlogin)




module.exports=router


