module.exports = function (sequelize, DataTypes) {

  let User = sequelize.define('user', {

    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    last_login: {
      type: DataTypes.DATE
    },

    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  }, {
    underscored: true
  });

  User.associate = function(models) {
    // Associating User with Stories
    // When a User is deleted, also delete any associated Stories
    User.hasMany(models.story, {
      onDelete: "cascade"
    });
  };

  return User;

}