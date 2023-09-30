const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

// Routes
app.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});


app.get("/listings/new",  (req, res) => {


    res.render("listings/new");
  });

app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", {listing});
});


// post route
app.post("/listings", async (req, res) => { 
    let {listing} = await req.body;
    Listing.create(listing);
    console.log(listing);
    res.redirect("/");
});

app.get("/listings/:id/edit", async (req, res) => { 
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", {listing});
});

// edit route
app.put("/listings/:id", async (req, res)=> {
    let {id} = req.params;
    console.log({...req.body.listing});
   await  Listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect("/")
})

app.delete("/listings/:id",async (req, res) => {
    let {id} = req.params;
    await  Listing.findByIdAndDelete(id)
    res.redirect("/") ;
})
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My Villa",
//     description: "by the beach",
//     price: 1200,
//     location: "Panji, Goa",
//     country: "IN",
//   });
//   await sampleListing.save();
//   console.log("Sample was Saved");
//   res.send("data saved successfully.");
// });

//

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
