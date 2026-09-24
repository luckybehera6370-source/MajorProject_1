if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const dns = require("dns");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


// ===============================
// MongoDB Connection
// ===============================

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });


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


async function main() {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    await mongoose.connect(dbUrl);

    await setDefaultPrices();
}


// ===============================
// Express Configuration
// ===============================

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);

app.engine("ejs", ejsMate);

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(methodOverride("_method"));

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ===============================
// MongoDB Session Store
// ===============================

const store = MongoStore.create({
    mongoUrl: dbUrl,

    crypto: {
        secret: process.env.SECRET
    },

    touchAfter: 24 * 60 * 60
});


store.on("error", (err) => {
    console.log("Error in Mongo Session Store:", err);
});


// ===============================
// Session Configuration
// ===============================

const sessionOptions = {
    store,

    secret: process.env.SECRET,

    resave: false,

    saveUninitialized: true,

    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,

        maxAge: 7 * 24 * 60 * 60 * 1000,

        httpOnly: true
    }
};


// ===============================
// Session Middleware
// ===============================

app.use(session(sessionOptions));


// ===============================
// Flash Middleware
// ===============================

app.use(flash());


// ===============================
// Passport Configuration
// ===============================

app.use(passport.initialize());

app.use(passport.session());

passport.use(
    new LocalStrategy(
        User.authenticate()
    )
);

passport.serializeUser(
    User.serializeUser()
);

passport.deserializeUser(
    User.deserializeUser()
);


// ===============================
// Global Variables
// ===============================

app.use((req, res, next) => {

    res.locals.success = req.flash("success") || [];

    res.locals.error = req.flash("error") || [];

    res.locals.currUser = req.user || null;

    next();
});


// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {

    res.redirect("/listings");

});


// ===============================
// Demo User Route
// ===============================

app.get("/demouser", async (req, res) => {

    let fakeUser = new User({
        email: "student@gmail.com",

        username: "delta-student"
    });

    let registeredUser = await User.register(
        fakeUser,
        "helloworld123"
    );

    res.send(registeredUser);
});


// ===============================
// Application Routes
// ===============================

app.use(
    "/listings",
    listingRouter
);

app.use(
    "/listings/:id/reviews",
    reviewRouter
);

app.use(
    "/",
    userRouter
);


// ===============================
// Error Handler
// ===============================

app.use((err, req, res, next) => {

    let {
        statusCode = 500,
        message = "Something went wrong"
    } = err;

    res.status(statusCode).render(
        "error",
        {
            err,
            message
        }
    );

});


// ===============================
// Server
// ===============================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

    console.log(
        `Server is listening on port ${PORT}`
    );

});