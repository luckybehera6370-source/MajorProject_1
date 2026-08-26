const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema ,reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

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

app.get("/" , (req,res) =>{
    res.send("Hi,I am root"); 
})

const validateListing = (req,res,next) => {
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};

const validateReview = (req,res,next) => {
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};


//INDEX ROIUTE
app.get("/listings", wrapAsync(async (req,res) => {
    const allListings =await Listing.find({});
    res.render("listings/index",{allListings});
}));

//new Route
app.get("/listings/new",(req,res) =>{
    res.render("listings/new");
});

//create Route
app.post("/listings",validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
}));

//Update Route
app.put("/listings/:id", validateListing, wrapAsync(async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing}, { new: true, runValidators: true });
    res.redirect(`/listings/${id}`);
}));

//delete Route
app.delete("/listings/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("Deleted successfully");
    res.redirect("/listings");
}));

//SHOW ROUTE
app.get("/listings/:id", wrapAsync(async (req,res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/show",{listing});
}));

//Reviews
//Post Route

app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).send("Listing not found");
  }

  const newReview = new Review(req.body.review);
  await newReview.save();
  listing.reviews.push(newReview._id);
  await listing.save();
  console.log("Review added successfully");
  res.redirect(`/listings/${listing._id}`);
}));

//Delete Review Route

app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
}));

// app.get("/textListing" ,async (req,res) => {
//     let sampleListing = new Listing ({
//       title :"My New Villa",
//       description : "by the beach",
//       price : 1200,
//       location : "calungate,Goa",
//       country : "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.use((err,req,res,next) => {
    let {statusCode = 500,message = "Something went wrong"} = err;
  return res.status(statusCode).render("error",{err, message});
});

app.listen(8080, () =>{
    console.log("Server is listening on port 8080");
});