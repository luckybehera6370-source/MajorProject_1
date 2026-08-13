const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


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

//INDEX ROIUTE
app.get("/listings", async (req,res) => {
    const allListings =await Listing.find({});
    res.render("listings/index",{allListings});
});

//new Route
app.get("/listings/new",(req,res) =>{
    res.render("listings/new");
});

//craete Route
app.post("/listings", async (req,res) =>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit",async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
});

//Update Route
app.put("/listings/:id", async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing}, { new: true, runValidators: true });
    res.redirect(`/listings/${id}`);
})

//delete Route
app.delete("/listings/:id", async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("Deleted successfully");
    res.redirect("/listings");
})

//SHOW ROUTE
app.get("/listings/:id", async (req,res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/show",{listing});
});


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

app.listen(8080, () =>{
    console.log("Server is listening on port 8080");
});
