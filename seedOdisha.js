require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");
const photoCredits = require("./public/images/odisha/ATTRIBUTION.json");
const getListingPhotoTheme = require("./utils/listingPhotoTheme.js");
const Listing = require("./models/listing.js");
const User = require("./models/user.js");

const odishaListings = [
    {
        _id: "6a0000000000000000000001",
        title: "Garden Stay near Kapilas Hills",
        description: "Sample hillside guesthouse with a garden and easy access to local nature trails.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
        },
        price: 1800,
        location: "Dhenkanal",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.596, 20.657] },
    },
    {
        _id: "6a0000000000000000000002",
        title: "Quiet Cottage near Puri Beach",
        description: "Sample coastal cottage for exploring Puri and the nearby shoreline.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
        },
        price: 2400,
        location: "Puri",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.831, 19.813] },
    },
    {
        _id: "6a0000000000000000000003",
        title: "City Apartment in Bhubaneswar",
        description: "Sample city apartment with convenient access to Bhubaneswar's attractions.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=60",
        },
        price: 2200,
        location: "Bhubaneswar",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.8245, 20.2961] },
    },
    {
        _id: "6a0000000000000000000004",
        title: "Heritage-Inspired Home in Cuttack",
        description: "Sample family stay suited to visitors exploring Cuttack's historic center.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=60",
        },
        price: 1700,
        location: "Cuttack",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.883, 20.4625] },
    },
    {
        _id: "6a0000000000000000000005",
        title: "Sunset Retreat near Konark",
        description: "Sample guest stay for a trip to Konark and the surrounding coast.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
        },
        price: 2100,
        location: "Konark",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [86.0945, 19.8876] },
    },
    {
        _id: "6a0000000000000000000006",
        title: "Hill View Stay in Daringbadi",
        description: "Sample hill-country stay with views of the surrounding highlands.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
        },
        price: 2000,
        location: "Daringbadi",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [84.13, 19.906] },
    },
    {
        _id: "6a0000000000000000000007",
        title: "Coastal Guesthouse in Gopalpur",
        description: "Sample guesthouse for a relaxed visit to Gopalpur's seaside area.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=60",
        },
        price: 2300,
        location: "Gopalpur",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [84.885, 19.258] },
    },
    {
        _id: "6a0000000000000000000008",
        title: "Riverside Stay in Sambalpur",
        description: "Sample city stay for visitors exploring Sambalpur and the Hirakud area.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=60",
        },
        price: 1900,
        location: "Sambalpur",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [83.975, 21.466] },
    },
    {
        _id: "6a0000000000000000000009",
        title: "Forest Edge Stay in Koraput",
        description: "Sample lodging for a trip to Koraput's hills and nearby countryside.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=60",
        },
        price: 1600,
        location: "Koraput",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [82.711, 18.813] },
    },
    {
        _id: "6a000000000000000000000a",
        title: "Temple Town Home in Puri",
        description: "Sample home base for visiting Puri's temples, markets, and beach.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=60",
        },
        price: 2000,
        location: "Puri",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.831, 19.813] },
    },
    {
        _id: "6a000000000000000000000b",
        title: "Modern Studio in Bhubaneswar",
        description: "Sample compact studio for a short city break or business visit.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=60",
        },
        price: 1500,
        location: "Bhubaneswar",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.8245, 20.2961] },
    },
    {
        _id: "6a000000000000000000000c",
        title: "Family Guesthouse in Cuttack",
        description: "Sample multi-room guesthouse for families visiting Cuttack.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=60",
        },
        price: 2500,
        location: "Cuttack",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.883, 20.4625] },
    },
    {
        _id: "6a000000000000000000000d",
        title: "Garden Bungalow near Dhenkanal",
        description: "Sample bungalow stay with outdoor space near Dhenkanal town.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=60",
        },
        price: 2100,
        location: "Dhenkanal",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.596, 20.657] },
    },
    {
        _id: "6a000000000000000000000e",
        title: "Seaside Room near Gopalpur Beach",
        description: "Sample room for guests spending a few days by the Gopalpur coast.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=60",
        },
        price: 1800,
        location: "Gopalpur",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [84.885, 19.258] },
    },
    {
        _id: "6a000000000000000000000f",
        title: "Hilltop Cottage in Daringbadi",
        description: "Sample cottage for exploring the hills and viewpoints around Daringbadi.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
        },
        price: 2600,
        location: "Daringbadi",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [84.13, 19.906] },
    },
    {
        _id: "6a0000000000000000000010",
        title: "Quiet Apartment in Sambalpur",
        description: "Sample apartment for guests visiting Sambalpur's city center.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=60",
        },
        price: 1400,
        location: "Sambalpur",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [83.975, 21.466] },
    },
    {
        _id: "6a0000000000000000000011",
        title: "Country House in Koraput",
        description: "Sample country house for a quiet stay in the Koraput region.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
        },
        price: 1750,
        location: "Koraput",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [82.711, 18.813] },
    },
    {
        _id: "6a0000000000000000000012",
        title: "Courtyard Stay near Konark",
        description: "Sample courtyard stay for visitors to Konark and the nearby coast.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=60",
        },
        price: 1950,
        location: "Konark",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [86.0945, 19.8876] },
    },
    {
        _id: "6a0000000000000000000013",
        title: "Beachside Family Stay in Puri",
        description: "Sample family lodging for a beach-focused visit to Puri.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
        },
        price: 2800,
        location: "Puri",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.831, 19.813] },
    },
    {
        _id: "6a0000000000000000000014",
        title: "Central Stay in Bhubaneswar",
        description: "Sample guest stay with a central location for exploring the capital.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=60",
        },
        price: 1900,
        location: "Bhubaneswar",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.8245, 20.2961] },
    },
    {
        _id: "6a0000000000000000000015",
        title: "Garden Guesthouse in Baripada",
        description: "Sample guesthouse for exploring Baripada and the nearby Similipal region.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=60",
        },
        price: 1850,
        location: "Baripada",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [86.735, 21.933] },
    },
    {
        _id: "6a0000000000000000000016",
        title: "Coastal Stay in Balasore",
        description: "Sample accommodation for a visit to Balasore and its surrounding coast.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=60",
        },
        price: 1700,
        location: "Balasore",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [86.933, 21.494] },
    },
    {
        _id: "6a0000000000000000000017",
        title: "City Apartment in Rourkela",
        description: "Sample city apartment for guests visiting Rourkela and nearby attractions.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=60",
        },
        price: 2100,
        location: "Rourkela",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [84.8536, 22.2604] },
    },
    {
        _id: "6a0000000000000000000018",
        title: "Harbor View Stay in Paradip",
        description: "Sample lodging for a short visit to Paradip and the coast.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=60",
        },
        price: 2000,
        location: "Paradip",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [86.611, 20.316] },
    },
    {
        _id: "6a0000000000000000000019",
        title: "Lakeside Retreat near Satapada",
        description: "Sample retreat for exploring Chilika Lake and the Satapada area.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60",
        },
        price: 2400,
        location: "Satapada",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.486, 19.674] },
    },
    {
        _id: "6a000000000000000000001a",
        title: "Quiet Stay near Taptapani",
        description: "Sample countryside lodging for visiting the Taptapani area.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
        },
        price: 1950,
        location: "Taptapani",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [84.4, 19.48] },
    },
    {
        _id: "6a000000000000000000001b",
        title: "Hill Country Home in Rayagada",
        description: "Sample home stay for exploring the hills around Rayagada.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
        },
        price: 1600,
        location: "Rayagada",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [83.416, 19.17] },
    },
    {
        _id: "6a000000000000000000001c",
        title: "Forest View Stay in Phulbani",
        description: "Sample lodging for guests exploring Kandhamal and Phulbani.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=60",
        },
        price: 1750,
        location: "Phulbani",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [84.233, 20.466] },
    },
    {
        _id: "6a000000000000000000001d",
        title: "Modern Guest Stay in Angul",
        description: "Sample guest stay with convenient access to Angul town.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=60",
        },
        price: 1800,
        location: "Angul",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.1, 20.84] },
    },
    {
        _id: "6a000000000000000000001e",
        title: "Central Apartment in Berhampur",
        description: "Sample apartment for a convenient stay in Berhampur.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=60",
        },
        price: 1650,
        location: "Berhampur",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [84.794, 19.314] },
    },
    {
        _id: "6a000000000000000000001f",
        title: "Nature Lodge near Bhitarkanika",
        description: "Sample nature-oriented stay for visiting the Bhitarkanika region.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=60",
        },
        price: 2600,
        location: "Rajnagar",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [86.81, 20.65] },
    },
    {
        _id: "6a0000000000000000000020",
        title: "Hill View Guesthouse in Jeypore",
        description: "Sample guesthouse for discovering Jeypore and the Koraput highlands.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=60",
        },
        price: 1850,
        location: "Jeypore",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [82.571, 18.856] },
    },
    {
        _id: "6a0000000000000000000021",
        title: "Beachside Stay in Chandipur",
        description: "Sample coastal stay for a visit to Chandipur and Balasore district.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
        },
        price: 2300,
        location: "Chandipur",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [87.02, 21.46] },
    },
    {
        _id: "6a0000000000000000000022",
        title: "Country Cottage near Ganjam",
        description: "Sample cottage for visitors exploring Ganjam district.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=60",
        },
        price: 1750,
        location: "Ganjam",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85, 19.38] },
    },
    {
        _id: "6a0000000000000000000023",
        title: "Townhouse in Bolangir",
        description: "Sample townhouse for a comfortable stay in Bolangir town.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=60",
        },
        price: 1550,
        location: "Bolangir",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [83.49, 20.71] },
    },
    {
        _id: "6a0000000000000000000024",
        title: "Farm Stay near Bargarh",
        description: "Sample farm-style stay for exploring the Bargarh countryside.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=60",
        },
        price: 1450,
        location: "Bargarh",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [83.62, 21.33] },
    },
    {
        _id: "6a0000000000000000000025",
        title: "Garden Home in Nayagarh",
        description: "Sample home stay for a quiet visit to Nayagarh and its surroundings.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=60",
        },
        price: 1700,
        location: "Nayagarh",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [85.1, 20.13] },
    },
    {
        _id: "6a0000000000000000000026",
        title: "Coastal Guest Stay in Astaranga",
        description: "Sample guest stay for exploring the quiet coast near Astaranga.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=60",
        },
        price: 2050,
        location: "Astaranga",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [86.3, 19.97] },
    },
    {
        _id: "6a0000000000000000000027",
        title: "Forest Retreat near Similipal",
        description: "Sample retreat for visitors planning a trip to the Similipal region.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=60",
        },
        price: 2500,
        location: "Similipal",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [86.37, 21.83] },
    },
    {
        _id: "6a0000000000000000000028",
        title: "Mountain View Stay near Deomali",
        description: "Sample mountain-area lodging for exploring Deomali in Koraput district.",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
        },
        price: 2200,
        location: "Deomali",
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: [82.96, 18.67] },
    },
];

const additionalDestinations = [
    { name: "Talsari Beach", stayType: "Coastal cabin", coordinates: [87.06, 21.59] },
    { name: "Mangalajodi", stayType: "Birding retreat", coordinates: [85.43, 19.86] },
    { name: "Rambha", stayType: "Lakeside guesthouse", coordinates: [85.08, 19.52] },
    { name: "Dhamra", stayType: "Harbor cottage", coordinates: [87.02, 20.79] },
    { name: "Bhadrak", stayType: "Town apartment", coordinates: [86.49, 21.06] },
    { name: "Jaleswar", stayType: "Garden stay", coordinates: [87.22, 21.80] },
    { name: "Soro", stayType: "Village homestay", coordinates: [87.07, 21.29] },
    { name: "Keonjhar", stayType: "Hill-view cottage", coordinates: [85.58, 21.63] },
    { name: "Gonasika", stayType: "Riverside retreat", coordinates: [85.55, 21.48] },
    { name: "Sanaghagara", stayType: "Waterfall lodge", coordinates: [85.60, 21.56] },
    { name: "Badaghagara", stayType: "Nature cabin", coordinates: [85.65, 21.51] },
    { name: "Barbil", stayType: "Town apartment", coordinates: [85.40, 22.12] },
    { name: "Joda", stayType: "Forest-edge cottage", coordinates: [85.43, 22.02] },
    { name: "Khandadhar", stayType: "Waterfall-view lodge", coordinates: [85.11, 21.96] },
    { name: "Sundargarh", stayType: "Heritage-inspired bungalow", coordinates: [84.04, 22.12] },
    { name: "Bonai", stayType: "Country guesthouse", coordinates: [85.00, 21.82] },
    { name: "Rajgangpur", stayType: "City guesthouse", coordinates: [84.58, 22.20] },
    { name: "Jharsuguda", stayType: "Modern apartment", coordinates: [84.01, 21.86] },
    { name: "Belpahar", stayType: "Hillside homestay", coordinates: [83.87, 21.83] },
    { name: "Deogarh", stayType: "Orchard cottage", coordinates: [84.73, 21.53] },
    { name: "Pradhanpat", stayType: "Forest cabin", coordinates: [84.72, 21.50] },
    { name: "Boudh", stayType: "Riverside home", coordinates: [84.32, 20.84] },
    { name: "Sonepur", stayType: "Heritage guesthouse", coordinates: [83.89, 20.83] },
    { name: "Titlagarh", stayType: "Town home", coordinates: [83.15, 20.29] },
    { name: "Patnagarh", stayType: "Courtyard stay", coordinates: [83.15, 20.71] },
    { name: "Nuapada", stayType: "Countryside lodge", coordinates: [82.55, 20.82] },
    { name: "Bhawanipatna", stayType: "Garden apartment", coordinates: [83.17, 19.91] },
    { name: "Junagarh", stayType: "Hill-country guesthouse", coordinates: [82.93, 19.86] },
    { name: "Kesinga", stayType: "Rail-town stay", coordinates: [83.22, 20.19] },
    { name: "Nabarangpur", stayType: "Garden cottage", coordinates: [82.55, 19.23] },
    { name: "Umerkote", stayType: "Woodland retreat", coordinates: [82.20, 19.67] },
    { name: "Malkangiri", stayType: "Lakeside guesthouse", coordinates: [81.89, 18.35] },
    { name: "Chitrakonda", stayType: "Reservoir cabin", coordinates: [82.03, 18.25] },
    { name: "Gunupur", stayType: "Hill-view apartment", coordinates: [83.81, 19.08] },
    { name: "Lamtaput", stayType: "Plateau retreat", coordinates: [82.74, 18.57] },
    { name: "Gupteswar", stayType: "Forest cottage", coordinates: [82.51, 18.77] },
    { name: "Sunabeda", stayType: "Mountain-view home", coordinates: [82.77, 18.72] },
    { name: "Paralakhemundi", stayType: "Heritage-style stay", coordinates: [84.08, 18.78] },
    { name: "Mahendragiri", stayType: "Mountain hut", coordinates: [84.35, 18.95] },
    { name: "Khandagiri", stayType: "City-edge apartment", coordinates: [85.78, 20.26] },
    { name: "Dhauli", stayType: "Hilltop guesthouse", coordinates: [85.84, 20.19] },
    { name: "Pipili", stayType: "Craft-town home", coordinates: [85.83, 20.11] },
    { name: "Raghurajpur", stayType: "Artisan-village stay", coordinates: [85.84, 19.89] },
    { name: "Banapur", stayType: "Countryside homestay", coordinates: [85.18, 19.78] },
    { name: "Khandapada", stayType: "Palace-town cottage", coordinates: [85.18, 20.26] },
    { name: "Jajpur", stayType: "Heritage guesthouse", coordinates: [86.33, 20.85] },
    { name: "Chandikhol", stayType: "Roadside lodge", coordinates: [86.12, 20.69] },
    { name: "Ratnagiri", stayType: "Buddhist-site retreat", coordinates: [86.14, 20.65] },
    { name: "Lalitgiri", stayType: "Hill-country cabin", coordinates: [86.23, 20.62] },
    { name: "Atri", stayType: "Hot-spring retreat", coordinates: [85.05, 20.18] },
];

odishaListings.push(
    ...additionalDestinations.map((destination, index) => ({
        _id: `6a00000000000000000000${(index + 0x29).toString(16).padStart(2, "0")}`,
        title: `Sample ${destination.stayType.toLowerCase()} near ${destination.name}`,
        description: `Illustrative ${destination.stayType.toLowerCase()} concept near ${destination.name}, for demo use only; this is not a verified accommodation.`,
        price: 3200 + index * 50,
        location: destination.name,
        state: "Odisha",
        country: "India",
        reviews: [],
        geometry: { type: "Point", coordinates: destination.coordinates },
    }))
);

if (photoCredits.assets.length !== odishaListings.length) {
    throw new Error("The Odisha photo attribution manifest must contain one unique photo per seeded listing.");
}

const listingsWithLocalImages = odishaListings.map((listing, index) => {
    const photo = photoCredits.assets[index];
    const filename = photo.file;
    if (photo.theme !== getListingPhotoTheme(listing.location)) {
        throw new Error(`The photo for ${listing.location} must match its ${getListingPhotoTheme(listing.location)} destination theme.`);
    }
    return {
        ...listing,
        image: {
            filename,
            url: `/images/odisha/${filename}`,
        },
    };
});

const uniqueSeedTitles = new Set(listingsWithLocalImages.map(({ title }) => title));
const uniqueSeedDescriptions = new Set(listingsWithLocalImages.map(({ description }) => description));
const uniqueSeedImageUrls = new Set(listingsWithLocalImages.map(({ image }) => image.url));
if (
    uniqueSeedTitles.size !== listingsWithLocalImages.length ||
    uniqueSeedDescriptions.size !== listingsWithLocalImages.length ||
    uniqueSeedImageUrls.size !== listingsWithLocalImages.length ||
    new Set(photoCredits.assets.map(({ file }) => file)).size !== listingsWithLocalImages.length
) {
    throw new Error("Sample seed listings must have unique titles, descriptions, and images.");
}

async function seedOdishaListings() {
    const dbUrl = process.env.ATLASDB_URL;
    if (!dbUrl) {
        throw new Error("ATLASDB_URL is not set. Check your local .env configuration.");
    }

    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    await mongoose.connect(dbUrl);

    const owner = await User.findOne().select("_id");
    if (!owner) {
        throw new Error("No user exists to own these listings. Create a user before seeding.");
    }

    const listingIds = listingsWithLocalImages.map(({ _id }) => _id);
    const existingIds = new Set(
        (await Listing.find({ _id: { $in: listingIds } }).distinct("_id"))
            .map((id) => id.toString())
    );
    const newListings = listingsWithLocalImages
        .filter(({ _id }) => !existingIds.has(_id))
        .map((listing) => ({ ...listing, owner: owner._id }));

    if (newListings.length > 0) {
        await Listing.insertMany(newListings);
    }

    await Listing.bulkWrite(
        listingsWithLocalImages.map(({ _id, image }) => ({
            updateOne: {
                filter: { _id },
                update: { $set: { image } },
            },
        }))
    );

    if (newListings.length === 0) {
        console.log("All sample Odisha listing IDs already exist; their seed images were refreshed.");
        return;
    }

    console.log(`Inserted ${newListings.length} sample Odisha listing(s) and refreshed seed images.`);
}

seedOdishaListings()
    .then(() => {
        console.log("All sample properties, prices, photos, and coordinates are illustrative; verify them before production. These are not verified accommodation businesses, and photos do not necessarily depict the named destinations.");
    })
    .catch((error) => {
        console.error("Odisha listing seed failed:", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
