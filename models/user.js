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
      type: DataTypes.string(255),
      field: 'email'
    },
    'forname': {
      type: DataTypes.string(30),
      field: 'forname'
    },
    'surname': {
      type: DataTypes.string(30),
      field: 'surname'
    },
    'createdOn': {
      type: DataTypes.string(255),
      field: 'created_on'
    }
  }, {
    tableName: 'users',
    schema: 'public',
    timestamps: false
  });

  return User;
};
