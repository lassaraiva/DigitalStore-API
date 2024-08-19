const { uri } = require('../config/database.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(uri, {logging: console.log});

const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: true
  });
 
const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product, 
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  path: {
    type: DataTypes.STRING(1000),
    allowNull: false
  }
}, {
  timestamps: true 
});

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

const ProductOption = sequelize.define('ProductOption', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
    onDelete: 'CASCADE', 
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  shape: {
    type: DataTypes.ENUM('square', 'circle'),
    defaultValue: 'square'
  },
  radius: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  type: {
    type: DataTypes.ENUM('text', 'color'),
    defaultValue: 'text'
  },
  value: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: true 
});

Product.hasMany(ProductOption, { foreignKey: 'product_id' });
ProductOption.belongsTo(Product, { foreignKey: 'product_id' });
   
sequelize.sync({alter: true});

module.exports ={
  Product, ProductImage, ProductOption
}