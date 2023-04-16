const Data =require("../models/FetchData")




exports.getData = (req,res,next)=>{

    Data.getAllProducts().then((products)=>{
        res.render("index",{
            products:products,
            isUser: req.session.userId,
            validationError: req.flash("validationErrors")[0],
            isAdmin:req.session.isAdmin
        })
        
    })
    

}