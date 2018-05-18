module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comments", {
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    commentAuthor: {
      type: DataTypes.STRING,
      defaultValue: "General"
    },
    upVotes: {
      type: DataTypes.INTEGER,
    }
  });
  return Comment;
};
