module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define("Story", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Story.associate = function(models) {
    // We're saying that a Story should belong to an Author
    // A Story can't be created without an Author due to the foreign key constraint
    Story.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Story;
};
