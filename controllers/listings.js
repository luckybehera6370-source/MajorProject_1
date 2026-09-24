const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN || process.env.MAP_TOKEN;
const geocodingClient = mapBoxToken ? mbxGeocoding({ accessToken: mapBoxToken }) : null;

const getValidGeometry = async (location) => {
    if (!location || !geocodingClient) return null;

    try {
        const response = await geocodingClient.forwardGeocode({
            query: location,
            limit: 1,
        }).send();

        const feature = response?.body?.features?.[0];
        const coordinates = feature?.geometry?.coordinates;

        if (Array.isArray(coordinates) && coordinates.length === 2 && coordinates.every(Number.isFinite)) {
            return {
                type: 'Point',
                coordinates,
            };
        }
    } catch (err) {
        console.warn('Map geocoding failed for location:', location, err.message);
    }

    return null;
};

module.exports.index = async (req, res) => {
    const { search } = req.query;
    let query = {};

    if (search && search.trim()) {
        const keyword = search.trim();
        query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { location: { $regex: keyword, $options: 'i' } },
                { country: { $regex: keyword, $options: 'i' } }
            ]
        };
    }

    const allListings = await Listing.find(query);
    res.render("listings/index", { allListings, search });
};

module.exports.renderNewForm = (req,res) =>{
    res.render("listings/new");
};

module.exports.showListing = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: { path: "author" }
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    const hasValidGeometry = listing.geometry && Array.isArray(listing.geometry.coordinates) && listing.geometry.coordinates.length === 2 && listing.geometry.coordinates.every(Number.isFinite);
    if (!hasValidGeometry) {
        const fixedGeometry = await getValidGeometry(listing.location);
        if (fixedGeometry) {
            listing.geometry = fixedGeometry;
            await Listing.findByIdAndUpdate(id, { geometry: fixedGeometry });
        }
    }

    res.render("listings/show",{listing});
};

module.exports.createListing = async (req, res, next) => {
    try {
        let response = null;

        if (geocodingClient) {
            response = await geocodingClient.forwardGeocode({
                query: req.body.listing.location,
                limit: 1,
            }).send();
        }

        const url = req.file.path;
        const filename = req.file.filename;
        const newListing = new Listing(req.body.listing);

        const feature = response?.body?.features?.[0];
        const coordinates = feature?.geometry?.coordinates;
        if (Array.isArray(coordinates) && coordinates.length > 0) {
            newListing.geometry = feature.geometry;
        }

        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        let savedListing = await newListing.save();
        console.log("New listing created:", savedListing);
        req.flash("success", "Listing created successfully!");
        return res.redirect("/listings");
    } catch (err) {
        return next(err);
    }
};

module.exports.renderEditForm = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for edit does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit",{listing, originalImageUrl});
};

module.exports.updateListing = async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing}, { new: true, runValidators: true });

    if((typeof req.file !== 'undefined'))
    {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }
    await listing.save();

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};
