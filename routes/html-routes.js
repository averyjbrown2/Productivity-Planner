const luxon = require("luxon");
const { DateTime } = luxon;
// const planner = require("../public/js/util.js");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dashboard", isAuthenticated, (req, res) => {
    const dt = DateTime.local();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = dt.plus({ days: i });
      const data = {
        view: date.toLocaleString(DateTime.DATE_FULL),
        value: date.toFormat("yyyyLLdd")
      };
      days.push(data);
    }
    res.render("dashboard", { days });
  });

  app.get("/community", isAuthenticated, (req, res) => {
    res.render("community");
  });

  app.get("/goals", isAuthenticated, (req, res) => {
    res.render("goals");
  });

  app.get("/planner/:date", isAuthenticated, (req, res) => {
    res.render("planner", { date: req.params.date });
  });

  app.get("/signup", isAuthenticated, (req, res) => {
    res.render("signup");
  });
};
