const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    }, 
    description: String,
    image: {
      url: String,
      filename: String,
    },
    // image: {
    //     filename: {
    //   type: String,
    //   default: 
    //   "https://images.unsplash.com/photo-1747985323857-5c1c16b2ac47?q=80&w=850&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // },
    // url: {
    //     type: String,
    //     default: "https://images.unsplash.com/photo-1747985323857-5c1c16b2ac47?q=80&w=850&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   set: (v) => 
    //      v ==""? "https://images.unsplash.com/photo-1747985323857-5c1c16b2ac47?q=80&w=850&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //   :v,
    // }
    // },
    // price: {
    //   type: Number,
    //   require: true
    // },
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});

listingSchema.post("findOneAndDelete",async (listing) => {
  if(listing){
    await Review.deleteMany({_id: { $in: listing.reviews }});
  }
});

const listing = mongoose.model("Listing",listingSchema);
module.exports = listing;