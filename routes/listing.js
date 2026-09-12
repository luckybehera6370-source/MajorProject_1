const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing} = require("../middleware.js");


//INDEX ROIUTE
router.get("/", wrapAsync(async (req,res) => {
    const allListings =await Listing.find({});
    res.render("listings/index",{allListings});
}));

//new Route
router.get("/new", isLoggedIn, (req,res) =>{
    res.render("listings/new");
});

//SHOW ROUTE
router.get("/:id", wrapAsync(async (req,res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id).populate("reviews").populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show",{listing});
}));

//create Route
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "Listing created successfully!");
  res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
    req.flash("error", "Listing you requested for edit does not exist!");
    return res.redirect("/listings");
  }
    res.render("listings/edit",{listing});
}));

//Update Route
router.put("/:id",isLoggedIn, isOwner, validateListing, wrapAsync(async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing}, { new: true, runValidators: true });
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}));

//delete Route
router.delete("/:id", isLoggedIn,isOwner,wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    console.log("Deleted successfully");
    res.redirect("/listings");
})); 

module.exports = router;