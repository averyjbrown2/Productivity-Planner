// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  app.get("/community", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/community.html"));
  });

  app.get("/goals", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/goals.html"));
  });

  app.get("/dayplanner", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "..public/dayplanner.html"));
  });

  app.get("/signup", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "..public/signup.html"));
  });
};
