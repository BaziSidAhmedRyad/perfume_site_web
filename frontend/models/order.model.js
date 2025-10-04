module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending'
    }
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'user_id' });
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
  };

  return Order;
};