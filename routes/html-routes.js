const luxon = require("luxon");
const { DateTime } = luxon;
// const planner = require("../public/js/util.js");

const db = require("../models");
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
  app.get("/dashboard", isAuthenticated, async (req, res) => {
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
    try {
      const goals = await db.Goal.findAll({});
      const posts = await db.Post.findAll({});
      res.render("dashboard", { days, goals, posts });
    } catch (err) {
      res.sendStatus(500);
    }
  });
  //render community page with posts from all users
  app.get("/community", isAuthenticated, (req, res) => {
    db.Post.findAll({ limit: 10 }).then(posts => {
      res.render("community", { posts });
    });
  });
  //render goals page with goals based on UserId of logged in user
  app.get("/goals", isAuthenticated, (req, res) => {
    db.Goal.findAll({
      where: { UserId: req.user.id }
    }).then(goals => {
      console.log(goals);
      res.render("goals", { goals });
    });
  });

  app.get("/planner/:date", isAuthenticated, (req, res) => {
    res.render("planner", { date: req.params.date });
  });

  app.get("/signup", isAuthenticated, (req, res) => {
    res.render("signup");
  });
};
