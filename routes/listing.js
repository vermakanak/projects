const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
            validatelisting,

    upload.single ('listing[image]'),

    wrapAsync(listingController.createListings)
);

//new Route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router
.route("/:id")
.get(wrapAsync(listingController.showListings))
.put(
    isLoggedIn,
    isOwner,
    upload.single ('listing[image]'),
    validatelisting,
    wrapAsync(listingController.updateListings))
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListings));    


//index route
// router.get("/", wrapAsync(listingController.index));




//show route
// router.get("/:id", wrapAsync(listingController.showListings));

//create route
// router.post(
//     "/",
//     isLoggedIn,
//     validatelisting,
//     wrapAsync(listingController.createListings)
// );

//edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListings));

//update route
// router.put(
//     "/:id",
//     isLoggedIn,
//     isOwner,
//     validatelisting,
//     wrapAsync(listingController.updateListings));

//delete route
// router.delete(
//     "/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.deleteListings));

module.exports = router;