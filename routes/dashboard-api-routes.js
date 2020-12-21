const db = require("../models");

module.exports = function(app) {
  app.get("/api/goals", (req, res) => {
    db.Goal.findAll(
      {
        where: { UserId: req.user.id }
      },
      { limit: 5 }
    ).then(dbGoal => {
      res.json(dbGoal);
    });
  });
};
