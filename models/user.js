'use strict'
module.exports = (sequelize, DataTypes) => {
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
      field: 'email',
      validate: {
        isEmail: {
          msg: 'Must be a valid email address'
        }
      }
    },
    'forname': {
      type: DataTypes.STRING,
      field: 'forname',
      validate: {
        notEmpty: true,
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'Must be a string without numbers'
        }
      }
    },
    'surname': {
      type: DataTypes.STRING,
      field: 'surname',
      validate: {
        notEmpty: true,
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'Must be a string without numbers'
        }
      }
    },
    'createdOn': {
      type: DataTypes.DATE,
      field: 'created_on'
    }
  }, {
    tableName: 'users',
    schema: 'public',
    timestamps: false
  })

  return User
}
