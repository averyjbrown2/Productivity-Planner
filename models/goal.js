module.exports = function(sequelize, DataTypes) {
  const Goal = sequelize.define("Goal", {
    title: { type: DataTypes.STRING(100), allowNull: false },
    added: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Goal.associate = function(models) {
    Goal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Goal;
};
