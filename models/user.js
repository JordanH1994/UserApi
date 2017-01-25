'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    'id': {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: 'users_pkey'
    },
    'email': {
      type: DataTypes.STRING,
      field: 'email'
    },
    'forname': {
      type: DataTypes.STRING,
      field: 'forname'
    },
    'surname': {
      type: DataTypes.STRING,
      field: 'surname'
    },
    'createdOn': {
      type: DataTypes.STRING,
      field: 'created_on'
    }
  }, {
    tableName: 'users',
    schema: 'public',
    timestamps: false
  });

  return User;
};
