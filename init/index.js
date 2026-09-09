const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await main();
    console.log("connected to DB");
    const owner = await User.findOne();
    if (!owner) {
      throw new Error("Create at least one user before seeding listings.");
    }
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: owner._id}));
    await Listing.insertMany(initData.data);
    console.log("Data was Initialized");
};

initDB()
  .catch((err) => {
    console.error("Database initialization failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });


