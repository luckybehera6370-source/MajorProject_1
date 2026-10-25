require("dotenv").config();

const mongoose = require("mongoose");
const dns = require("dns");
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

    const listingIds = odishaListings.map(({ _id }) => _id);
    const existingIds = new Set(
        (await Listing.find({ _id: { $in: listingIds } }).distinct("_id"))
            .map((id) => id.toString())
    );
    const newListings = odishaListings
        .filter(({ _id }) => !existingIds.has(_id))
        .map((listing) => ({ ...listing, owner: owner._id }));

    if (newListings.length === 0) {
        console.log("All sample Odisha listing IDs already exist; nothing was inserted.");
        return;
    }

    await Listing.insertMany(newListings);
    console.log(`Inserted ${newListings.length} sample Odisha listing(s).`);
}

seedOdishaListings()
    .then(() => {
        console.log("Sample property details, prices, image selections, and coordinates are illustrative only. Verify them before production use; these are not verified accommodation businesses.");
    })
    .catch((error) => {
        console.error("Odisha listing seed failed:", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });
