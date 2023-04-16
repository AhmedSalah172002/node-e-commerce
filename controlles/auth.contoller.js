const user=require("../models/signup")
const validationResult = require('express-validator').validationResult


exports.getSignup=((req,res,next)=>{
    res.render("signup",{
        validitionError:req.flash("validitionError"),
        isUser:false,
        isAdmin:false
    })
})

exports.postSignup=((req,res,next)=>{
    if(validationResult(req).isEmpty()){
        user.addToSignup(req.body.username,req.body.email,req.body.password)
        .then(()=>res.redirect("login"))
        .catch(()=>res.render("signup"))
    }else{
        req.flash("validitionError",validationResult(req).array())
        res.redirect("signup")
    }
})


exports.getlogin=(req,res,next)=>{
    
    res.render("login",{
        authError: req.flash("authError")[0],
        loginError:req.flash("loginError"),
        isUser: false,
        isAdmin:false
    })
}

exports.postlogin=((req,res,next)=>{
    if(validationResult(req).isEmpty()){

        user.addToLogin(req.body.email,req.body.password)
        .then((result)=>{
            req.session.userId=result.id
            req.session.isAdmin = result.isAdmin;
            res.redirect("/")
        }).catch((err)=>{
            req.flash("authError",err)
            res.redirect("login")
        })
    }else{
        req.flash("loginError",validationResult(req).array())
        res.redirect("login")
    }
        
})