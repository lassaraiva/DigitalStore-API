const { uri } = require('../config/database.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(uri);

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    timestamps: true, 
  });
  
sequelize.sync();

module.exports ={
    User
}