const Listing = require("../models/listing")



module.exports.index = async (req, res) => {
    const alllistings = await Listing.find({})
    res.render("listings/index.ejs", { alllistings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
        populate: {
            path: "author",
        },
    })
        .populate("owner");
        // console.log("Image value:", listing.image);

        if (!listing) {
            req.flash("error", "requested listing does not exists");
            return res.redirect("/listings");

        }
        res.render("listings/show.ejs", { listing });
    };

module.exports.createListings = async (req, res, next) => {
            let url = req.file.path;
            let filename = req.file.filename;

            const newlisting = new Listing(req.body.listing);
            newlisting.owner = req.user._id;
            newlisting.image = {url, filename};
            await newlisting.save();
            req.flash("success", "new listing created");
            res.redirect("/listings");
        };

 
module.exports.editListings = async (req, res) => {
                let { id } = req.params;
                const listing = await Listing.findById(id);
                if (!listing) {
                    req.flash("error", "requested listing does not exists");
                    res.redirect("/listings");
                    return;
                }
                
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
 
                res.render("listings/edit.ejs", { listing, originalImageUrl });
            };

module.exports.updateListings = async (req, res) => {
                    let { id } = req.params;
                    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

                    if(typeof req.file !== ""){
                    let url = req.file.path;
                    let filename = req.file.filename;
                    listing.image = { url , filename };
                    await listing.save();
                }
                    req.flash("success", "listing updated");
                    res.redirect(`/listings/${id}`);
                };


module.exports.deleteListings = async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        // console.log(deletedListing);
        req.flash("success", "listing delete");
        res.redirect("/listings");
    };