const luxon = require("luxon");
const { DateTime } = luxon;
// const planner = require("../public/js/util.js");

const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
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
  //render dashboard with goals, posts, etc...
  //Anthony did the base of this. Showed how to await pull from all APIs at once and catch error
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
      const goals = await db.Goal.findAll({
        where: { UserId: req.user.id }
      });
      const posts = await db.Post.findAll({ limit: 3 });
      res.render("dashboard", { days, goals, posts });
    } catch (err) {
      res.sendStatus(500);
    }
  });
  //render community page with posts from all users
  app.get("/community", isAuthenticated, async (req, res) => {
    try {
      const allPosts = await db.Post.findAll({
        limit: 10
      });
      const userPosts = await db.Post.findAll({
        where: { UserId: req.user.id }
      });
      res.render("community", { allPosts, userPosts });
    } catch (err) {
      res.sendStatus(500);
    }
  });

  app.get("/planner/:date", isAuthenticated, (req, res) => {
    const date = {
      date: req.params.date
    };

    const block = [];

    for (let i = 7; i < 20; i++) {
      const times = {
        time: i,
        date: req.params.date,
        text: null,
        UserId: req.user.id
      };
      block.push(times);
    }
    db.Schedule.findAll({
      where: { UserId: req.user.id, date: req.params.date }
    }).then(items => {
      const blocks = block.map((item, index) => {
        if (items[index] && items[index].time === item.time) {
          return items[index];
        }
        return item;
      });
      const timeBlock = blocks.map(item => {
        const newBlock = { ...item };
        newBlock.formattedTime = DateTime.fromISO(req.params.date)
          .plus({ hours: newBlock.time })
          .toFormat("ha");
        return newBlock;
      });
      db.Objective.findAll({
        where: {
          date: req.params.date
        }
      }).then(newGoals => {
        res.render("planner", {
          date,
          timeBlock,
          formattedDate: DateTime.fromISO(req.params.date).toLocaleString(
            DateTime.DATE_MED_WITH_WEEKDAY
          ),
          goals: newGoals
        });
      });
    });
    app.get("/signup", isAuthenticated, (req, res) => {
      res.render("signup");
    });
  });
};
