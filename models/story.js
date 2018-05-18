module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define("Post", {
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
      validate: {
        len: [1]
      }
    },
    genre: {
      type: DataTypes.STRING,
      defaultValue: "General"
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upVotes: {
      type: DataTypes.INTEGER,
    }
  });
  return Story;
};
