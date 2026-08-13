const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{
        type : String,
        required : true,
    },
    description : String,
    image: {
        type: String,
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1776715139572-ae3d62ce6f6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8" : v, 
    },
    price: {
        type: Number,
        min: 0,
        default: 1000,
    },
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;