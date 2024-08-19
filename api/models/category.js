const { uri } = require('../config/database.js');
const {Product} = require('./product.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(uri);

const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true
  });


Product.belongsToMany(Category, { through: "ProductCategory", foreignKey: 'product_id' });
Category.belongsToMany(Product, { through: "ProductCategory", foreignKey: 'category_id' });

sequelize.sync(); 

module.exports ={
  Category
}