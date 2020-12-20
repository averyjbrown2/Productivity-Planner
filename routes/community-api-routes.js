const db = require("../models");

module.exports = function(app) {
  //POST route to create a Post with data available to us in req.body
  app.post("/api/posts", (req, res) => {
    db.Post.create({
      title: req.body.title,
      author: req.body.author,
      text: req.body.text,
      UserId: req.user.id
    }).then(dbPost => {
      res.json(dbPost);
      console.log(dbPost);
    });
  });
};
