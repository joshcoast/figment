module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('story', {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    underscored: true
  });

  Story.associate = function (models) {
    // We're saying that a Story should belong to a User
    // A Story can't be created without a User due to the foreign key constraint
    Story.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Story;
};