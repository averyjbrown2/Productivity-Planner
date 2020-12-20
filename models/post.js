module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    title: { type: DataTypes.STRING(100), allowNull: false },
    author: { type: DataTypes.STRING(100), allowNull: false },
    text: {
      type: DataTypes.STRING(250)
    }
  });
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post;
};
