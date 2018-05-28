module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      required: true
    }
  }, {
    underscored: true
  });
  return Comment;
};