const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema ,reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");


const validateListing = (req,res,next) => {
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};


//INDEX ROIUTE
router.get("/", wrapAsync(async (req,res) => {
    const allListings =await Listing.find({});
    res.render("listings/index",{allListings});
}));

//new Route
router.get("/new",(req,res) =>{
    res.render("listings/new");
});

//SHOW ROUTE
router.get("/:id", wrapAsync(async (req,res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/show",{listing});
}));

//create Route
router.post("/",validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit", wrapAsync(async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
}));

//Update Route
router.put("/:id", validateListing, wrapAsync(async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing}, { new: true, runValidators: true });
    res.redirect(`/listings/${id}`);
}));

//delete Route
router.delete("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("Deleted successfully");
    res.redirect("/listings");
})); 

module.exports = router;