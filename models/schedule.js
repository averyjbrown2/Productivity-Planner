module.exports = function(sequelize, DataTypes) {
  const Schedule = sequelize.define("Schedule", {
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.User);
  };
  return Schedule;
};
