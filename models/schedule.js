module.exports = function(sequelize, DataTypes) {
  const Schedule = sequelize.define("Schedule", {
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Schedule;
};
