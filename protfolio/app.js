const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const blogData = require("./public/db/blogData.json");
const { kill } = require("process");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//routes

// home route

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/blogs", (req, res) => {
  res.render("partials/blogs", { blogs: blogData });
});
app.get("/projects", (req, res) => {
  res.render("partials/projects", { blogs: blogData });
});

app.get("/about-me", (req, res) => {
  res.render("partials/about", { blogs: blogData });
});

app.get("/blog/:blogName", (req, res) => {
  const { blogName } = req.params;
  console.log(blogName);
  const blog = blogData.find((b) => blogName === b.name);
  console.log(blog);
  if (!blog) {
    return res.status(404).render("partials/error");
  }
 res.render("blog", { blog });
});



app.get("/blog", (req, res) => {
  res.render("blog", { blog: blogData });
});



app.get("*/*", (req, res) => {
  res.send("error 404");
});


const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
