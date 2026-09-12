const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js");


//Reviews
//Post Route

  router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).send("Listing not found");
  }

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  await newReview.save();
  listing.reviews.push(newReview._id);
  await listing.save();
  req.flash("success", "Review added successfully!");
  res.redirect(`/listings/${listing._id}`);
}));

//Delete Review Route

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
}));

module.exports = router;
