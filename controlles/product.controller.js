const product =require("../models/FetchData")




exports.getProductData = (req,res,next)=>{
    let id = req.params.id;
    product.getProduct(id).then((product)=>{
        console.log(product);
        res.render("product",{
            product:product,
            isUser: req.session.userId,
            isAdmin:req.session.isAdmin
        })
        
    })
    

}