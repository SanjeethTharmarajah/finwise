//loads required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
//creates budget table
class Budget extends Model {}

Budget.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    monthlyincome: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    monthlybudgetlimit: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date:{
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'budget',
  }
);
//exports budget
module.exports = Budget;
