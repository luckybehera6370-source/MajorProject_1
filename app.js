const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash"); 

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB")
  })
  .catch((err) => {
    console.log(err)
  })

async function setDefaultPrices() {
    await Listing.updateMany(
      { price: { $exists: false } },
      { $set: { price: 1000 } }
    );
    await Listing.updateMany(
      { price: null },
      { $set: { price: 1000 } }
    );
}

async function main(){
    await mongoose.connect(MONGO_URL);
    await setDefaultPrices();
}

app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const sessionOptions = {
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true, 
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
  },
};

app.get("/" , (req,res) =>{
    res.send("Hi,I am root"); 
})

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/listings", listings);
app.use("/listings/:id/reviews",reviews);


app.use((err,req,res,next) => {
    let {statusCode = 500,message = "Something went wrong"} = err;
  return res.status(statusCode).render("error",{err, message});
});

app.listen(8080, () =>{
    console.log("Server is listening on port 8080");
});