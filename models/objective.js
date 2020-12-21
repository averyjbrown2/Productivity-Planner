module.exports = function(sequelize, DataTypes) {
  const Objective = sequelize.define("Objective", {
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  });
  Objective.associate = function(models) {
    Objective.belongsTo(models.User);
  };
  return Objective;
};
