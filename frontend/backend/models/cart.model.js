module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'user_id' });
    Cart.belongsTo(models.Perfume, { foreignKey: 'perfume_id' });
  };

  return Cart;
};