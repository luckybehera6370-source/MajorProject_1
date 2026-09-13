const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

router.route("/")
    //Index and Create Route
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing))


//new Route
router.route("/new")
    .get(isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    //Show, Update, and Delete Route
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;