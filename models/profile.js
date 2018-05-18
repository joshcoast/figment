module.exports = function (sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    name: DataTypes.STRING
  });
  return Profile;
}