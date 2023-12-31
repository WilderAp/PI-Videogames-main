const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Genres', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
}