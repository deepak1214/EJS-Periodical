//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
let posts = [];

const homeStartingContent =
  "Hi 😄, Thanks for visiting my Journal. I hope you are doing great, let's just stop procrastinating on our dreams and grow together for a better tomorrow. So, are you guys with me in this?✨ Work hard & Be Smart 😎";
const aboutContent =
  "In this Magazine you can expect to see a lot of great content regarding Technology,Data Structures & Algorithms and Core Subjects like DBMS,OS,OOPS & Computer Networking❤.";
const contactContent =
  "Let's Connect if you want to contribute to my Journal & If you like to talk anything related to tech & Coding 🎉.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { homeContent: homeStartingContent, posts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutInfo: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactInfo: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:sec", function (req, res) {
  posts.forEach(function (post) {
    if (lodash.lowerCase(post.title) == lodash.lowerCase(req.params.sec)) {
      res.render("post", { title: post.title, body: post.post });
    }
  });
});

app.post("/compose", function (req, res) {
  const postObject = req.body;
  posts.push(postObject);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
