'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: 'users_pkey'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      validate: {
        isEmail: {
          msg: 'Must be a valid email address'
        }
      }
    },
    forename: {
      type: DataTypes.STRING,
      field: 'forename',
      validate: {
        notEmpty: true,
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'Must be a string without numbers'
        }
      }
    },
    surname: {
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
    createdOn: {
      type: DataTypes.DATE,
      field: 'created_on'
    }
  }, {
    tableName: 'users',
    schema: 'public',
    timestamps: false
  })

  User.sync()
  .then(() => {
    User.bulkCreate(require('../scripts/baseData.json'))
  })
  return User
}
