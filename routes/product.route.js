const router=require("express").Router();
const productController =require("../controlles/product.controller")

router.get("/:id",productController.getProductData)


module.exports=router