module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
      // Giving the Author model a name of type STRING
      reader: DataTypes.STRING,
      feedback: DataTypes.STRING,
    });
  
  
    return Comment;
  };