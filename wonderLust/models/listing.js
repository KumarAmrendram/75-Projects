const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// set: (v) => (v === "" ? "https://unsplash.com/photos/ZrZ79vX2bMs" : v),

const listingSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://unsplash.com/photos/ZrZ79vX2bMs",
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
