const express=require("express");
const app=express();
const dotenv=require("dotenv").config()
const port=process.env.PORT;
var flash = require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
console.log(port);
const path=require("path");

const homeRouter=require("./routes/home.route");
const productRouter=require("./routes/product.route")
const auth=require("./routes/auth")
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/orders.route");
const adminRouter = require("./routes/admin.route");

app.use(express.static(path.join(__dirname,"assets")));
app.use(express.static(path.join(__dirname,"images")));

app.set("view engine","ejs");
app.set("views","views");

const store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'mySessions'
  });

  app.use(session({
    secret: 'This is a secret',
    saveUninitialized:false,
    store: store,
    resave: true,
    saveUninitialized: true
  }));

app.use(flash())
app.use("/",homeRouter)
app.use("/",auth)
app.use("/product",productRouter)
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/", orderRouter);
app.get("/error", (req, res, next) => {
  res.status(500);
  res.render("error.ejs", {
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      pageTitle: "Error"
  });
});

app.get("/not-admin", (req, res, next) => {
  res.status(403);
  res.render("not-admin", {
      isUser: req.session.userId,
      isAdmin: false,
      pageTitle: "Not Allowed"
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.render("not-found", {
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      pageTitle: "Page Not Found"
  });
});

app.get('/',(req,res,next)=>{
    res.render("index")
})



app.listen(5000,(err)=>{
   
    console.log(`server listen on port ${port} `);
})