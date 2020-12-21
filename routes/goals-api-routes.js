const db = require("../models");

module.exports = function(app) {
  //GET route to find all goals by user
  app.get("/api/goals", (req, res) => {
    db.Goal.findAll({
      where: { UserId: req.user.id }
    }).then(dbGoal => {
      res.json(dbGoal);
    });
  });
  //GET route to retrieve a single post
  app.get("/api/goals/:id", (req, res) => {
    db.Goal.findOne({
      where: { UserId: req.user.id }
    }).then(dbGoal => {
      res.json(dbGoal);
    });
  });
  //POST route to create a goal with data available to us in req.body and req.user
  app.post("/api/goals", (req, res) => {
    db.Goal.create({
      title: req.body.title,
      UserId: req.user.id
    }).then(dbGoal => {
      res.json(dbGoal);
    });
  });
  //PUT route to update the goal
  app.put("/api/goals/:id", (req, res) => {
    db.Goal.update(
      {
        added: req.body.added,
        inProgress: req.body.inProgress,
        completed: req.body.completed
      },
      { where: { id: req.params.id } }
    ).then(dbGoal => {
      res.json(dbGoal);
    });
  });
  //DELETE route for deleting goals
  app.delete("/api/goals/:id", (req, res) => {
    db.Goal.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbGoal => {
      res.json(dbGoal);
    });
  });
};
