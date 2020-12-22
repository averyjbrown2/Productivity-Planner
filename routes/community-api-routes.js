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
  //DELETE route for deleting posts
  app.delete("/api/posts/:id", (req, res) => {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });
};
