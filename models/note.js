module.exports = function(sequelize, DataTypes) {
  const Note = sequelize.define("Note", {
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Note.associate = function(models) {
    Note.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Note;
};
