module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('story', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    description: {
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
  }, {
    underscored: true
  });

  // Story.associate = function (models) {
  //   // We're saying that a Story should belong to a User
  //   // A Story can't be created without a User due to the foreign key constraint
  //   Story.belongsTo(models.user, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Story;
};