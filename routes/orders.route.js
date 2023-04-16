const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const orderController = require("../controlles/order.controller");
const authGaurd = require("./auth/auth.guard");

router.get("/verify-order", authGaurd .isAuth, orderController.getOrderVerify);




router.get("/orders", authGaurd .isAuth, orderController.getOrder);

router.post(
    "/orders",
    authGaurd .isAuth,
    bodyParser.urlencoded({ extended: true }),
    check("address")
        .not()
        .isEmpty()
        .withMessage("address is required"),
    orderController.postOrder
);

router.post(
    "/orders/cancel",
    authGaurd .isAuth,
    bodyParser.urlencoded({ extended: true }),
    orderController.postCancel
);

module.exports = router;
